const authService = require("../service/auth");

const login = async (req,res) => {
    const email = req.query.email ;
    const result = await authService.generateLoginToken(email);
    res.json(result);
};

const confirm = async (req,res) => {
    const {id, token, email} = req.query ;
    const result = await authService.confirm(email, id, token);
    if(result) res.json(result);
    else res.sendStatus(400);
};


const validate = (req,res) => {
    res.json({valid: authService.validateToken(req.body.id, req.body.token)});
};

const register = async (req,res) => {
    const {email, firstName, type} = req.body; //TODO Clean parse data for Uppercase and so on
    const result = await authService.register(email, firstName, type);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {
    login, validate, register, confirm
};