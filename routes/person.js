const express = require('express')
const router = express.Router()
const Person = require("../models/person")


//Create and Save a Record of a Model:
router.post('/', (req,res) => {
    const newPerson = new Person({ ...req.body })
        newPerson.save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err))
})

//Creating Many Records with model.create():
router.post('/', (req, res) => {
        await Person.create([
            {   "name": 'Ahmed', 
                "age": 34, 
                "favoriteFoods": ["Pizza", "burritos", "Paela"]
            },
            {   "name": 'Mariem', 
                "age": 29, 
                "favoriteFoods": ["Rizotto", "truffle", "Ceaser salade"]
            },
            {   "name": 'Hela', 
                "age": 30, 
                "favoriteFoods": ["chocolate", "burritos", "Potatoes"]
            },
            {   "name": 'Ahmed', 
                "age": 36, 
                "favoriteFoods": ["Pasta", "Sausage", "Kebab"]
            }
        ])
        .then(person => resstatus(200).json(person))
        .catch(err => console.log(err))
    })

//Using model.find()
router.get("/", (req, res) => {
    Person.find()
        .then(persons => res.status(200).json(persons))
        .catch(err => res.send(err))
})

//Using model.findOne()
router.get("/:favouriteFoods", (req, res) => {
    Person.findOne({favoriteFoods})
        .then(person => res.send(person))
        .catch(err => res.send(err))
})

//Using model.findById()
router.get("/:_id", (req, res) => {
    let { _id } = req.params
    Person.find({ _id })
        .then(person => res.send(person))
        .catch(err => res.send(err))
})

//Perform Classic Updates by Running Find, Edit, then Save
router.put("/:_id", (req, res) => {
    let { _id } = req.params
    let favouriteFoodToSet = 'hamburger';
    Person.findByIdAndUpdate({ _id }, { $set: {favoriteFoods: favouriteFoodToSet} })
    Person.save()
        .then(person => res.status(200).json(person))
        .catch(err => console.log(err))
})

//Perform New Updates on a Document Using model.findOneAndUpdate()
router.put("/:name", (req, res) => {
    (personName, done) => {
        let ageToSet = 20;
        Person.findOneAndUpdate({name : personName } , {$set: {age: ageToSet}} ,{ new: true })
        .then(person => res.status(200).json(person))
        .catch(err => console.log(err))
      
    }
})

//Delete One Document Using model.findByIdAndRemove
router.put("/:_id", (req, res) => {
    let { _id } = req.params
    User.findByIdAndRemove({ _id })
        .then(person => res.status(200).json(person))
        .catch(err => res.send(err))
})

//Delete Many Documents with model.remove()
router.put("/:_name", (req, res) => {
    (personName, done) => {
        let personName = 'Mary'
        Person.remove({name : personName })
        .then(person => res.status(200).json(person))
        .catch(err => console.log(err))
      
    }
})

//Chain Search Query
router.put("/:_name", (req, res) => {
    () => {
        let foodToSearch = "burritos";
        let food = {favoriteFoods : foodToSearch};
        User.find(food).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
            (err) ? console.log(err) : console.log(data); 
        })
    }

})

module.exports = router
