const authService = require("../service/auth");

const login = async (req,res) => {
    const email = req.query.email ;
    const result = await authService.generateLoginToken(email).catch(catchError);
    if(result && result.success) res.json(result);
    else res.sendStatus(400);
};

const confirm = async (req,res) => {
    const {id, token} = req.query ;
    const result = await authService.confirm(id, token).catch(catchError);
    if(result) res.json(result);
    else res.sendStatus(400);
};

const sendConfirmation = async (req,res) => {
    const {id} = req.query ;
    const result = await authService.sendConfirmation(id).catch(catchError);
    if(result) res.json(result);
    else res.sendStatus(400);
};


const validate = (req,res) => {
    res.json({valid: authService.validateToken(req.body.id, req.body.token)});
};

const register = async (req,res) => {
    const {email, firstName, type} = req.body;
    const result = await authService.register(email, firstName, type).catch(catchError);
    if(result) res.json(result);
    else res.sendStatus(400);
};

const catchError = e => {console.error(e); return null};

module.exports = {
    login, validate, register, confirm, sendConfirmation
};