const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => {
    const dummy = {
        user: {
            firstName: "Riccardo Luca",
            emailAddress: "riccardo@broggi.co.uk",
            pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w",
            role: "admin"
        },
        mentor: {
            id: 1,
            firstName: "Emil",
            course: "Philosophy",
            university: "Oxford",
            pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
        }};
    res.json(dummy);
});

router.get('/logout', (req,res) => {
    res.json({});
});

router.post('/onboard', (req,res) => {
    console.log(req.body.emailAddress);
    res.json({});
});

module.exports = router;