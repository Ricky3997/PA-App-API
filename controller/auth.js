const authService = require("../service/auth");

const login = async (req,res) => {
    const email = req.query.email ;
    const result = await authService.generateLoginToken(email);
    res.json(result);
};

const confirm = async (req,res) => {
    const {id, token, email} = req.query ;
    const result = await authService.confirm(email, id, token);
    res.json(result);
};


const validate = (req,res) => {
    res.json({valid: authService.validateToken(req.body.id, req.body.token)});
};

const register = async (req,res) => {
    const {email, firstName, type} = req.body;
    const result = await authService.register(email, firstName, type);
    res.json(result);
};

module.exports = {
    login, validate, register, confirm
};