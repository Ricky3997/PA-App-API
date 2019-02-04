require('dotenv').load();
const _ = require("lodash");

getAll = () => {
    //TODO Get from DB
    return [
        {
            mentee: {
                id: 3,
                firstName: "Riccardo",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"
            },
            mentor: {
                id: 1,
                firstName: "Emil",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c387b4192029bc4b0dd95/1538660326244/20247810_10211655657680787_3062606713295678620_o.jpg?format=500w"
            },
            progress: 50,
            id: 2
        }, {
            mentee: {
                id: 3,
                firstName: "Catriona",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
            },
            mentor: {
                id: 1,
                firstName: "Alex",
                course: "PPE",
                university: "KCL",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
            },
            progress: 64,
            id: 3
        }, {
            mentee: {
                id: 3,
                firstName: "Anna",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
            },
            mentor: {
                id: 1,
                firstName: "Raphael",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
            },
            progress: 29,
            id: 4
        }, {
            mentee: {
                id: 3,
                firstName: "Johanna",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2538ec83025ec9aa303a9/1538413472637/35943589_10212129123569503_6674639723585077248_n.jpg?format=500w"
            },
            mentor: {
                id: 1,
                firstName: "Filip",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
            },
            progress: 75,
            id: 5
        }, {
            mentee: {
                id: 3,
                firstName: "Henning",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
            },
            mentor: {
                id: 1,
                firstName: "Nicole",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
            },
            progress: 21,
            id: 6
        }
    ];
}

module.exports = {getAll};