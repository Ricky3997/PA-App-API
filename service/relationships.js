require('dotenv').load();
const { Relationship } = require("./../models/relationship");
const _ = require("lodash");

getAll = async () => {
    return await Relationship.find().populate("mentee").populate("mentor").exec().then(p => { return p})
};

module.exports = {getAll};