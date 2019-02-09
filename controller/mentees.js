const menteesService = require("../service/mentees");

const getAll = async (req, res) => {
  const result = await menteesService.getAll();
  if (result) res.json(result);
  else res.sendStatus(400);
};

const registerNew = async (req, res) => {
  const { id } = req.decoded;
  const data = req.body;
  const result = await menteesService.registerNew(id, data);
  if (result) res.json(result);
  else res.sendStatus(400);
};

const changeStatus = async (req,res) => {
  const {id} = req.decoded;
  const data = req.body;
  const result = await menteesService.changeStatus(id, data);
  if(result) res.json(result);
  else res.sendStatus(400);
};

module.exports = { getAll, registerNew, changeStatus };