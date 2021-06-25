import { axiosGet } from '../utils/api'

function getImgList(api, current, limit) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/post.json?page=' + current + '&limit=' + limit,
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

function getSelectedImgList(api, tag, page, limit) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/post.json?page=' + page + '&tags=' + tag + '&limit=' + limit,
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

function getSearchRes(api, value, page) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/tag.json?name=' + value + '&order=count&page=' + page,
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

function getRandomList(api, page, limit) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/post.json?page=' + page + '&tags=order%3Arandom&limit=' + limit,
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

function getPopList(api, date) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/post/popular_by_day.json?day=' + date[2] + '&month=' + date[1] + '&year=' + date[0],
            success(data) {
                resolve(data)
            },
            error(err) {
                reject(err)
            }
        })
    })
}

const collections = () => {
    const arr = []
    for (let i = 0; i < localStorage.length; i++) {
        let getKey = localStorage.key(i)
        let getValue = JSON.parse(localStorage.getItem(getKey))
        arr[i] = getValue
    }
    return arr.flat()
}

function addCollection(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

function downloadPicture(image) {
    fetch(image.jpeg_url).then(res => res.blob().then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = image.id + '.jpeg';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }))
}

export { getImgList, getSelectedImgList, getSearchRes, getRandomList, getPopList, addCollection, collections, downloadPicture }