// 节流函数
export const throttle = (fn, interval) => {
    var current = Date.now();

    if (!interval) {
        interval = 300;
    }

    return function () {
        let context = this, args = arguments, now = Date.now();

        if (now - current < interval) {
            current = now;
            return fn.apply(context, args)
        }
    }
}

export const debounce = (fn, wait) => {
    let timer = null;
    return function () {
        let context = this, args = arguments
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

// const defaultTagInfo = {
//     tagname: '',
//     imageList: []
// }            

export const getImgTagMap = (imgList) => {
    const imgTagMap = {}
    for (const img of imgList) {
        const taglist = img.tags.split(" ")
        for (const tag of taglist) {
            imgTagMap[tag] = imgTagMap[tag] || []
            imgTagMap[tag].push(img.id)

            // imgTagMap[ tag ] =  imgTagMap[ tag ] || defaultTagInfo
            // imgTagMap[ tag ].tagname = tag
            // imgTagMap[ tag ].imageList.push(img.id)
        }
    }

    return imgTagMap
}

export const getEachImgTag = (img) => {
    const imgTags = []
    const taglist = img.tags.split(" ")
    taglist.map((tag, i) => {
        const item = { id: img.id + i, name: tag }
        imgTags.push(item)
        return imgTags[i]
    })
    return imgTags
}

export const getCollectList = (collectList) => {
    const collectIds = []
    for (const collect of collectList) {
        collectIds.push(collect.id)
    }
    return collectIds
}

export const loadingImg = (imgList, loading) => {
    imgList.map(img => img.preview_url = loading)
}


export function getDateFormat() {
    const time = new Date()
    const year = time.getFullYear()
    let mon = time.getMonth() + 1
    let date = time.getDate()

    if (mon < 10) {
        mon = "0" + mon
    }

    if (date < 10) {
        date = "0" + date
    }

    return year + '-' + mon + '-' + date
}