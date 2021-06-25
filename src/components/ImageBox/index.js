import React, { useEffect, useState, useRef, memo } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { changeIsShow, changePage, collectionManager } from '../../store/actions';
import { collections, addCollection, downloadPicture } from '../../models/index'
import { getCollectList, getEachImgTag } from '../../utils/functions'
import loading from '../../assets/loading.gif';
import Dialog from '../Dialog/Dialog';
import HoverMenu from '../HoverMenu'
import FloatList from '../FloatList';
import './style.css';

const ImageBox = ({ image, isSelected, isCollected }) => {
  const imgList = useSelector(state => state.img.imgList)
  const pageOffset = useSelector(state => state.showType.scrollTop)
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [showDialog, setShowDialog] = useState({ isShow: false, title: "", type: "text", message: "", confirm: null });
  const [isHover, setIsHover] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, up: false });
  const [listPosition, setListPosition] = useState({ x: 0, y: 0, up: false });
  const [btnList, setBtnList] = useState([{ btnInfo: '显示图片', btnFn: {} }])
  const [showTags, setShowTags] = useState(false);
  const [tags, setTags] = useState([])
  const menuAction = useRef(null);
  const imageDom = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    setShowHoverMenu(false)
    setShowTags(false)
    const collectFn = () => {
      if (isCollected) {
        localStorage.removeItem(image.id)
        dispatch(collectionManager(getCollectList(collections())))
      } else {
        const collectList = []
        collectList.push(image)
        addCollection(image.id, collectList)
        dispatch(collectionManager(getCollectList(collections())))
      }
    }

    const showTags = (e) => {
      const tagList = getEachImgTag(image)
      setTags(tagList)
      const width = window.innerWidth
      const rect = e.target.getBoundingClientRect()

      let x = rect.left + 0.5 * (rect.right - rect.left);
      let y = rect.top

      if (width - (x + 100) < 100) {
        x -= 250
      } else {
        x += 50
      }

      setListPosition({ x: x, y: y, up: true });

      setShowTags(true)
    }

    const downloadFn = () => {
      downloadPicture(image)
    }
    setBtnList([{ btnInfo: isCollected ? '取消收藏' : '收藏', btnFn: collectFn }, { btnInfo: 'Tag', btnFn: showTags }, { btnInfo: '下载', btnFn: downloadFn }])
  }, [isCollected, pageOffset, image, dispatch, imgList, history])

  const onHover = () => {

    const height = window.innerHeight;
    const rect = menuAction.current.getBoundingClientRect()

    let x = rect.left + 0.5 * (rect.right - rect.left);
    let y = rect.bottom + pageOffset;

    if ((height - rect.bottom) < 120) {
      y = y - rect.height - 70;
      setPosition({ x: x, y: y, up: true });
    } else {
      setPosition({ x: x, y: y, up: false })
    }
    setShowHoverMenu(true)
  }

  const offHover = () => {
    setShowHoverMenu(false)
    setShowTags(false)
  }

  const onClick = () => {
    setShowDialog({ isShow: true, title: "图片信息", type: "img", message: image.sample_url, confirm: null })
  }

  const onLoad = () => {
    imageDom.current.src = imageDom.current.getAttribute('data-src')
  }

  const btnFn = (e, tag) => {
    e.preventDefault()
    setShowTags(false)
    if (history.location.pathname !== "/search/" + tag) {
      dispatch(changePage(1))
      dispatch(changeIsShow(true))
      history.push("/search/" + tag + "/page=" + 1)
    } else {
      console.log("已在当前页")
    }
  }

  return (
    <>
      <div
        className={isSelected ? "imgbox selected" : "imgbox"}
        key={image.id}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          className="cat-image"
          ref={imageDom}
          alt={image.id}
          onLoad={onLoad}
          src={loading}
          data-src={image.preview_url}
          onClick={onClick}
        />
        {isHover &&
          <div
            ref={menuAction}
            className="action-menu"
            onMouseEnter={onHover} onMouseLeave={offHover}
          >
            <div className="menu-top"></div>
            <svg className="edit-icon" viewBox="0 0 1024 1024">
              <path d="M919.9 461.7c-27.7 0-50 21.8-50 48.8v373.3c0 13.3-11.4 24.5-24.9 24.5H152.8c-13.6 0-25.1-11.2-25.1-24.5V137.2c0-13.3 11.5-24.5 25.1-24.5h372c27.5 0 49.9-21.8 49.9-48.8S552.3 15 524.8 15h-372C83.9 15 28 69.8 28 137.2v746.7c0 67.4 55.9 122.1 124.8 122.1H845c68.8 0 124.7-54.7 124.7-122.1V510.5c0.1-26.9-22.3-48.8-49.8-48.8z" fill="#1296DB" p-id="5113"></path><path d="M1007.1 26.3c-19.8-16.9-49.6-14.6-66.5 5.3L380.7 688c-17 19.8-14.6 49.6 5.2 66.5 8.9 7.6 19.7 11.3 30.6 11.3 13.4 0 26.6-5.6 35.9-16.5l560-656.4c16.9-19.9 14.5-49.6-5.3-66.6z" fill="#1296DB"></path>
            </svg>
            <div className="menu-bottom"></div>
            {showHoverMenu &&
              <HoverMenu position={position} btnList={btnList} />
            }
            {showTags && <FloatList position={listPosition} list={tags} fn={btnFn} />}
          </div>
        }
      </div>
      {showDialog.isShow &&
        (<Dialog showDialog={showDialog} setShowDialog={setShowDialog} />)}
    </>
  )
}

export default memo(ImageBox);
