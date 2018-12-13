import fetch from "cross-fetch";

export const get = (resource) => {
    return fetch(resource, {headers: {'Authorization': `Bearer ${window.localStorage.getItem("token")}`}})
        .then(res => {
            if(res.status === 200) {
                return res.json().then( payload => {return {success: true, payload: payload}})
            }
            else return {success: false, status: res.status}
        })
        .catch(err => {
            return {success: false, error: "Unexpected error, sorry!"}
        })
};

export const post = (resource, body) => {
    return fetch(resource, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        method: "POST",
        body: JSON.stringify(body)
    }).then(res => {
            if(res.status === 200) {
                return res.json().then( payload => {return {success: true, payload: payload}})
            }
            else return {success: false, status: res.status}
        })
        .catch((err) => {
            return {success: false, error: "Unexpected error, sorry!"}
        })
};

export const postForm = (resource, body) => {
  return fetch(resource, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    },
    method: "POST",
    body: body
  }).then(res => {
    if(res.status === 200) {
      return res.json().then( payload => {return {success: true, payload: payload}})
    }
    else return {success: false, status: res.status}
  })
    .catch((err) => {
      return {success: false, error: "Unexpected error, sorry!"}
    })
};
