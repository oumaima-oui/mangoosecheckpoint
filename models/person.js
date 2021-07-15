const mongoose = require("mongoose")
const schema = mongoose.Schema

const person = new schema({
    name : {type : String, required:true},
    age : Number,
    favoriteFoods : [String]
})

module.exports = Person = mongoose.model("person", person)
