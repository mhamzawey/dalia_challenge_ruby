import axios from 'axios'

export  const BASE_URL = "http://localhost:8000";
export const events_url = "/events/";


export const getEvents = (page) => {
    return new Promise((resolve, reject) => {
        return axios.get(BASE_URL+events_url+"?per_page=10"+"&page=" +page)
            .then((res) => resolve(res));
    })
    .catch(err => console.log(err));
};

export const getSeachEvent = (searchterm) => {
    return new Promise((resolve, reject) => {
        return axios.get(BASE_URL+events_url+"?starts_with="+searchterm)
            .then((res) => resolve(res));
    })
        .catch(err => console.log(err));
};

