const mentorsService = require("../service/mentors");

const getAll = (req,res) => {
    const result = mentorsService.getAll();
    if(result) res.json(result);
    else res.sendStatus(400);
};

const getById = (req,res) => {
    const result = mentorsService.getById(req.params.id);
    if(result) res.json(result);
    else res.sendStatus(400);
};


module.exports = {getAll, getById};