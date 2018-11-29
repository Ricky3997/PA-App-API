const authService = require("../service/auth");

const login = async (req,res) => {
    const email = req.query.email ;
    const result = await authService.generateToken(email);
    res.json(result);
};


const validate = (req,res) => {
    res.json({valid: authService.validateToken(req.body.email, req.body.token)});
};

const register = async (req,res) => {
    const {email, firstName, type} = req.body;
    const result = await authService.register(email, firstName, type);
    res.json(result);
};

module.exports = {
    login, validate, register
};