const mentorsService = require("../service/mentors");

const getAll = async (req,res) => {
    const result = await mentorsService.getAll(req.admin);
    if(result) res.json(result);
    else res.sendStatus(400);
};

const getById = async (req,res) => {
    const result = await mentorsService.getById(req.params.id);
    if(result) res.json(result);
    else res.sendStatus(400);
};

const registerNew = async (req,res) => {
    const {id} = req.decoded;
    const data = req.body;
    const result = await mentorsService.registerNew(id, data);
    if(result) res.json(result);
    else res.sendStatus(400);
};
const changeStatus = async (req,res) => {
    const {id} = req.decoded;
    const data = req.body;
    const result = await mentorsService.changeStatus(id, data);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {getAll, getById, registerNew, changeStatus};