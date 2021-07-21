import { axiosGet } from '../utils/api'

function getImgList(api, current, limit) {
    return new Promise((resolve, reject) => {
        axiosGet({
            api: api,
            url: '/post.json?page=' + current + '&tags=rating:safe&limit=' + limit,
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
            url: '/post.json?page=' + page + '&tags=' + tag + '+rating:safe&limit=' + limit,
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
            url: '/post.json?page=' + page + '&tags=order%3Arandom+rating:safe&limit=' + limit,
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

function downloadPicture(image, api) {
    // const src = image.jpeg_url.split("https://konachan.com").reverse().join("")

    var a = document.createElement('a');
    a.href = image.jpeg_url;
    a.setAttribute('download', true)
    var filename = image.id + '.jpg';
    a.download = filename;
    a.click();


    // fetch("http://localhost:5000/" + api + src).then(res =>

    //     res.blob().then(blob => {
    //         console.log(blob)
    //         var a = document.createElement('a');
    //         var url = window.URL.createObjectURL(blob);
    //         var filename = image.id + '.jpg';
    //         a.href = url;
    //         a.download = filename;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //     }))
    // canvas方法
    // const src = image.jpeg_url
    // let canvas = document.createElement('canvas')
    // let img = document.createElement('img')
    // img.src = src
    // img.onload = () => {
    //     canvas.width = img.width
    //     canvas.height = img.height
    //     let context = canvas.getContext('2d')
    //     context.drawImage(img, 0, 0, img.width, img.height)
    //     canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
    //     canvas.toBlob(blob => {
    //         let link = document.createElement('a')
    //         link.href = window.URL.createObjectURL(blob)
    //         link.download = 'download' // resource name
    //         link.click()
    //     }, "/*可指定图片格式*/", "1")
    // }
}

export { getImgList, getSelectedImgList, getSearchRes, getRandomList, getPopList, addCollection, collections, downloadPicture }