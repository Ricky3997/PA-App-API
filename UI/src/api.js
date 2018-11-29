const get = (resource) => {
    return fetch(resource, {headers: {'Authorization': `Bearer ${window.localStorage.getItem("token")}`}})
        .then(res => res.json())
        .catch(err => {
            return {success: false, error: "Unexpected error, sorry!"}
        })
};

const post = (resource, body) => {
    return fetch(resource, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        method: "POST",
        body: body
    })
        .then(res => res.json())
        .catch((err) => {
            return {success: false, error: "Unexpected error, sorry!"}
        })
};

module.exports = {get, post};