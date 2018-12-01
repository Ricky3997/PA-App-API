const menteesService = require("../service/mentees");

const getAll = (req,res) => {
    const result = menteesService.getAll()
    if(result) res.json(result)
    else res.sendStatus(400);
};

module.exports = {getAll};