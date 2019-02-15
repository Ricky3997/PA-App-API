const relationshipsService = require("../service/relationships");

const getAll = async (req,res) => {
    const result = await relationshipsService.getAll()
    if(result) res.json(result)
    else res.sendStatus(400);
};

module.exports = {getAll};