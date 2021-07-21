import axios from 'axios';

axios.defaults.crossDomain = true;

function axiosGet(options) {

    axios("https://moepics-proxy.herokuapp.com/" + options.api + options.url)
        .then(res => {
            options.success(res.data)
        })
        .catch(err => {
            options.error(err)
        })
}

export { axiosGet }