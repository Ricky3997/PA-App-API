require('dotenv').load();
const { Relationship } = require("./../models/relationship");
const _ = require("lodash");

getAll = async () => {
    return await Relationship.find().populate({ path: 'mentee', populate: { path: 'relationship' }})
      .populate({ path: 'mentor', populate: { path: 'relationship' }}).exec().then(p => { return p})
};

module.exports = {getAll};