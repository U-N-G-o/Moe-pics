import axios from 'axios';

import { urlList } from '../configs/config';

function axiosGet(options) {

    let url = urlList[0].url

    urlList.map(item =>
        item.name === options.api ?
            url = item.url : null
    )

    axios(url + options.url)
        .then(res => {
            options.success(res.data)
        })
        .catch(err => {
            options.error(err)
        })
}

export { axiosGet }