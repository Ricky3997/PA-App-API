require('dotenv').load();
const { Mentor } = require('./../models/mentors');

getAll = async (admin) => {
  let criteria;
  if (!admin) return [];
  else if (admin.admin === 'superadmin') criteria = {};
  else if (admin.admin) criteria = { country: admin.admin };
  else criteria = { university: admin.campusTeamAdmin };
  return await Mentor.find(criteria).populate({ path: 'relationship', populate: { path: 'mentee' } }).exec().then(p => {
    return p;
  });
};

const getById = async (id) => {
  return await Mentor.findById(id).populate({ path: 'relationship', populate: { path: 'mentee' } }).exec().then(p => {
    return p;
  });
};


module.exports = { getAll, getById };
