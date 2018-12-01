const relationshipsService = require("../service/relationships");

const getAll = (req,res) => {
    const result = relationshipsService.getAll()
    if(result) res.json(result)
    else res.sendStatus(400);
};

module.exports = {getAll};