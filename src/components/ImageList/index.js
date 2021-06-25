import React, { useEffect, useRef, useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { changeIsShow, changePage, collectionManager } from '../../store/actions'
import { collections, addCollection, downloadPicture } from '../../models'
import { getCollectList, debounce } from '../../utils/functions'
import Dialog from '../Dialog/Dialog';
import loading from '../../assets/loading.gif'
import './style.css'

const ImageList = ({ image, isCollected, limit }) => {
  const currentPage = useSelector(state => state.img.currentPage)
  const pageOffset = useSelector(state => state.showType.scrollTop)
  const [taglist, setTaglist] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()
  const [showDialog, setShowDialog] = useState({ isShow: false, title: "", type: "text", message: "", confirm: null });
  const [style, setStyle] = useState({})
  const imageDom = useRef(null)

  useEffect(() => setTaglist(image.tags.split(" ")), [image])
  useEffect(() => {
    if (isCollected) {
      setStyle({ fill: "#fff", background: "violet" })
    }
  }, [isCollected])

  useEffect(() => {
    const wh = window.innerHeight
    let mainDom = document.querySelector(".mainbox")
    let shouldchange = false

    if ((pageOffset + wh - 80) === mainDom.clientHeight) {
      shouldchange = true
    } else {
      shouldchange = false
    }

    const mouseWheel = debounce((e) => {
      if (e.deltaY > 0 && shouldchange) {
        // window.scrollTo(0, 0)
        mainDom = document.querySelector(".mainbox")
        dispatch(changePage(currentPage + 1))
        shouldchange = false
        window.removeEventListener("mousewheel", mouseWheel)
      }
      if (pageOffset === 0 && currentPage !== 1 && e.deltaY < 0) {
        dispatch(changePage(currentPage - 1))
        window.removeEventListener("mousewheel", mouseWheel)
      }
    }, 1500)
    window.addEventListener("mousewheel", mouseWheel)

    return () => { window.removeEventListener("mousewheel", mouseWheel) }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOffset])

  const onLoad = () => {
    imageDom.current.src = imageDom.current.getAttribute('data-src')
  }

  const showPic = () => {
    setShowDialog({ isShow: true, title: "图片信息", type: "img", message: image.sample_url, confirm: null })
  }

  const tagFn = (e, tag) => {
    e.preventDefault()
    if (history.location.pathname !== "/search/" + tag) {
      dispatch(changePage(1))
      dispatch(changeIsShow(true))
      history.push("/search/" + tag)
    } else {
      console.log("已在当前页")
    }
  }

  const collectFn = () => {
    if (isCollected) {
      setStyle({ fill: "#8a8a8a" })
      localStorage.removeItem(image.id)
      dispatch(collectionManager(getCollectList(collections())))
    } else {
      const collectList = []
      collectList.push(image)
      addCollection(image.id, collectList)
      dispatch(collectionManager(getCollectList(collections())))
    }
  }

  const dlFn = () => {
    downloadPicture(image)
  }

  return (
    <>
      <li className="imginfo-list">
        <div className="infolist-imgbox">
          <img className="img-show"
            ref={imageDom}
            onLoad={onLoad} src={loading}
            data-src={image.preview_url}
            alt={image.id}
            onClick={showPic}
          />
        </div>
        <div className="infolist-list">
          <div className="img-taglist">
            {taglist.map((tag, i) =>
              <div key={i} className="img-tag" onClick={(e) => tagFn(e, tag)}>
                {tag}
              </div>
            )}
          </div>
          <div className="img-actionlist">
            <span onClick={showPic}>
              <svg viewBox="0 0 1024 1024">
                <path d="M987.52 367.36C879.36 220.8 720.64 128 543.36 128S208 220.8 99.2 367.36c-48 64.64-48 160.64 0 225.28C208 739.2 366.72 832 543.36 832c177.28 0 335.36-92.8 444.16-239.36 48-64.64 48-160.64 0-225.28z m-48 172.16C839.04 684.8 694.4 768 542.72 768s-296.32-83.2-396.8-228.48c-24.32-33.92-24.32-84.48 0-119.04C246.4 275.2 391.04 192 542.72 192s296.32 83.2 396.8 228.48c23.68 34.56 23.68 85.12 0 119.04zM544 256c-123.52 0-224 100.48-224 224s100.48 224 224 224 224-100.48 224-224-100.48-224-224-224z m0 384c-88.32 0-160-71.68-160-160s71.68-160 160-160 160 71.68 160 160-71.68 160-160 160z"></path>
              </svg>
            </span>
            <span onClick={collectFn}>
              <svg style={style} viewBox="0 0 1024 1024">
                <path d="M511.3 767.9c-4.1 0-8.2-1.4-11.6-4.1-2.4-2-60.4-49.3-119.3-112.2-81.3-86.7-122.5-158.2-122.5-212.4 0-84.6 66.9-153.4 149.2-153.4 23.5 0 46.9 5.8 67.7 16.7 13.4 7 25.8 16.2 36.6 27.1 10.8-10.9 23.2-20.1 36.6-27.1 20.8-10.9 44.2-16.7 67.7-16.7 82.3 0 149.2 68.8 149.2 153.4 0 54.2-41.2 125.6-122.5 212.4-58.9 62.9-116.9 110.2-119.3 112.2-3.6 2.8-7.7 4.1-11.8 4.1zM407.1 322.6c-62 0-112.5 52.3-112.5 116.6 0 43.9 38.8 108.5 112.3 186.9 42 44.9 84.5 82.4 104.4 99.4 19.9-17 62.4-54.5 104.4-99.4C689.2 547.8 728 483.2 728 439.3c0-64.3-50.4-116.6-112.5-116.6-35.4 0-68 16.8-89.4 46.1-3.5 4.7-9 7.5-14.8 7.5-5.9 0-11.4-2.8-14.8-7.5-21.4-29.4-54-46.2-89.4-46.2z"></path>
                <path d="M511.3 977.9c-62.9 0-123.9-12.3-181.3-36.6-55.5-23.5-105.3-57-148-99.8-42.8-42.8-76.3-92.6-99.8-148-24.3-57.4-36.6-118.4-36.6-181.3s12.3-123.9 36.6-181.3c23.5-55.5 57-105.3 99.8-148 42.8-42.8 92.6-76.3 148-99.8 57.4-24.3 118.4-36.6 181.3-36.6 62.9 0 123.9 12.3 181.3 36.6 55.5 23.5 105.3 57 148 99.8 42.8 42.8 76.3 92.6 99.8 148 24.3 57.4 36.6 118.4 36.6 181.3s-12.3 123.9-36.6 181.3c-23.5 55.5-57 105.3-99.8 148-42.8 42.8-92.6 76.3-148 99.8-57.4 24.3-118.4 36.6-181.3 36.6z m0-894.6c-236.5 0-429 192.4-429 429 0 236.5 192.4 429 429 429 236.5 0 429-192.4 429-429s-192.4-429-429-429z"></path>
              </svg>
            </span>
            <span onClick={dlFn}>
              <svg viewBox="0 0 1024 1024">
                <path d="M924.78 337.61A449.35 449.35 0 1 0 960 512a446.4 446.4 0 0 0-35.22-174.39zM512 896c-211.74 0-384-172.26-384-384s172.26-384 384-384 384 172.26 384 384-172.26 384-384 384z m202.83-383a32 32 0 0 1 0 45.26L534.32 738.85l-0.28 0.26-0.84 0.81h-0.06l-0.56 0.48-0.58 0.6-0.11 0.09c-0.2 0.17-0.41 0.32-0.61 0.48l-0.46 0.35-0.17 0.13c-0.21 0.16-0.43 0.3-0.65 0.46l-0.42 0.29-0.21 0.15-0.67 0.42-0.44 0.27-0.24 0.15-0.63 0.35-0.5 0.28-0.24 0.14-0.6 0.29-0.58 0.29-0.23 0.11-0.54 0.24-0.68 0.29-0.21 0.09-0.48 0.19-0.8 0.3-0.18 0.06-0.43 0.14-0.9 0.29h-0.14l-0.4 0.11-1 0.26h-0.13l-0.38 0.09-1 0.22h-0.1l-0.42 0.07-1 0.17h-0.09l-0.51 0.06-0.94 0.11H514.1l-0.75 0.06h-3.12l-0.73-0.06h-0.83l-0.92-0.11-0.53-0.06h-0.09l-1-0.17-0.44-0.07h-0.1l-1-0.22-0.41-0.09h-0.08L503 747l-0.42-0.11h-0.14l-0.88-0.28-0.45-0.15-0.18-0.06-0.78-0.3-0.5-0.19-0.2-0.09-0.68-0.29-0.55-0.24-0.23-0.11-0.57-0.29c-0.2-0.1-0.41-0.19-0.61-0.3l-0.23-0.13-0.5-0.27-0.65-0.37-0.22-0.13-0.45-0.29c-0.23-0.14-0.45-0.27-0.67-0.42l-0.19-0.13-0.47-0.32-0.66-0.46-0.14-0.12-0.54-0.41c-0.19-0.15-0.4-0.3-0.59-0.46l-0.1-0.08-0.71-0.62-0.43-0.36c-0.4-0.36-0.79-0.73-1.17-1.12L308.62 558.23A32 32 0 0 1 353.9 513l125.77 125.9-0.08-331.39a32 32 0 0 1 32-32 32 32 0 0 1 32 32l0.08 331.49 125.9-126a32 32 0 0 1 45.26 0z"></path>
              </svg>
            </span>
          </div>
        </div>
      </li>
      {showDialog.isShow &&
        (<Dialog showDialog={showDialog} setShowDialog={setShowDialog} />)}
    </>
  )
}

export default memo(ImageList);
