import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { changeImgList } from '../../store/actions'
import './Img.css'
import ImageBox from '../../components/ImageBox'
import ImageList from '../../components/ImageList'
import { debounce } from '../../utils/functions'
import { getImgList, getRandomList, getSelectedImgList } from '../../models'

const Img = ({ images, barWidth, setShowLoading, limit }) => {
    const currentPage = useSelector((state) => state.img.currentPage)
    const hoverImgIds = useSelector(state => state.listWithTag.hasTag)
    const collectIds = useSelector(state => state.collectList.collectList)
    const showType = useSelector(state => state.showType.showType)
    const pageOffset = useSelector(state => state.showType.scrollTop)
    const api = useSelector(state => state.api.api)
    const [listPage, setListPage] = useState(currentPage)
    const [loading, setLoading] = useState(false)
    const mainDom = useRef(null)

    const dispatch = useDispatch();
    const history = useHistory()

    const loaction = history.location.pathname

    const marginLeft = barWidth;

    const style = { marginLeft: marginLeft }

    // const prePage = () => {
    //     if (currentPage === 1) {
    //         return
    //     } else {
    //         setShowLoading(true)
    //         dispatch(changePage(currentPage - 1))
    //     }
    // }

    // const nextPage = () => {
    //     setShowLoading(true)
    //     dispatch(changePage(currentPage + 1))
    // }

    // 监听滚轮事件，顶部触发上一页，触底下一页
    // useEffect(() => {
    //   const wh = window.innerHeight
    //   let mainDom = document.querySelector(".mainbox")
    //   let shouldchange = false

    //   if ((pageOffset + wh - 80) === mainDom.clientHeight) {
    //     shouldchange = true
    //   } else {
    //     shouldchange = false
    //   }

    //   const mouseWheel = debounce((e) => {
    //     if (e.deltaY > 0 && shouldchange) {
    //       mainDom = document.querySelector(".mainbox")
    //       dispatch(changePage(currentPage + 1))
    //       shouldchange = false
    //       window.removeEventListener("mousewheel", mouseWheel)
    //     }
    //     if (pageOffset === 0 && currentPage !== 1 && e.deltaY < 0) {
    //       dispatch(changePage(currentPage - 1))
    //       window.removeEventListener("mousewheel", mouseWheel)
    //     }
    //   }, 500)
    //   window.addEventListener("mousewheel", mouseWheel)

    //   return () => { window.removeEventListener("mousewheel", mouseWheel) }

    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageOffset])

    // 另一种思路，将list变为无限滚动长列表
    useEffect(() => {

        setLoading(false)

        const wh = window.innerHeight

        let shouldchange = false

        const isNeedScroll = !loaction.includes('collection') && !loaction.includes('popular')

        const getFn = (listPage) => {
            if (loaction.includes('random')) {
                return getRandomList(api, listPage, limit)
            } else if (loaction.includes('search')) {
                const tag = loaction.split('/')[2]
                return getSelectedImgList(api, tag, listPage, limit)
            } else {
                return getImgList(api, listPage, limit)
            }
        }


        const fetchList = async (listPage) => {
            window.removeEventListener('mousewheel', mouseWheel)
            const defaultList = await getFn(listPage)
            const pathArr = loaction.split('/')
            pathArr.pop()
            const path = pathArr.join('/')

            history.push(path + "/page=" + listPage)

            const newList = [...images, ...defaultList]
            dispatch(changeImgList(newList))
            window.scrollTo({
                top: pageOffset - 1,    // -1防止重复触发换页
                behavior: 'smooth'
            })
        }

        const mouseWheel = debounce((e) => {
            if (e.deltaY > 0 && shouldchange) {
                shouldchange = false
                fetchList(listPage + 1)
                setListPage(listPage + 1)
                setLoading(false)
            }
        }, 500)

        if (isNeedScroll) {

            if ((pageOffset + wh - 80) === mainDom.current.clientHeight) {
                shouldchange = true
                setLoading(true)
            } else {
                shouldchange = false
            }

            window.addEventListener('mousewheel', mouseWheel)
            return () => { window.removeEventListener('mousewheel', mouseWheel) }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaction, history, images, pageOffset, listPage])

    return (
        <div
            className={showType === 'grid' ? "mainbox grid" : "mainbox flexlist"}
            style={showType === 'grid' ? style : { flexDirection: 'column', alignItems: 'start', ...style }}
            ref={mainDom}
        >
            {showType === 'grid'
                ?
                <>
                    {images.map((image) =>
                        <ImageBox
                            key={image.id}
                            image={image}
                            isSelected={hoverImgIds.includes(image.id)}
                            isCollected={collectIds.includes(image.id)}
                        />
                    )}
                    {/* 原始点击切换页面 */}
                    {/* <svg className="prebtn" onClick={prePage} style={currentPage === 1 ? { display: "none" } : style} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M64 512C64 264.576 264.576 64 512 64s448 200.576 448 448-200.576 448-448 448S64 759.424 64 512z m64 0c0 212.077 171.923 384 384 384s384-171.923 384-384-171.923-384-384-384-384 171.923-384 384z m165.552-36.207c-12.595-12.305-12.755-32.414-0.357-44.915 12.273-12.376 32.254-12.656 44.873-0.72l0.38 0.365 168.893 165.005a8 8 0 0 0 11.213-0.031l166.872-164.85c12.4-12.25 32.383-12.327 44.878-0.264l0.376 0.37c12.343 12.307 12.42 32.14 0.266 44.542l-0.372 0.374L546.76 657.256c-18.623 18.398-48.552 18.48-67.277 0.187l-185.931-181.65z"></path></svg> */}
                    {/* <svg className="nextbtn" onClick={nextPage} style={loaction.includes("collection") ? { display: "none" } : null} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M64 512C64 264.576 264.576 64 512 64s448 200.576 448 448-200.576 448-448 448S64 759.424 64 512z m64 0c0 212.077 171.923 384 384 384s384-171.923 384-384-171.923-384-384-384-384 171.923-384 384z m165.552-36.207c-12.595-12.305-12.755-32.414-0.357-44.915 12.273-12.376 32.254-12.656 44.873-0.72l0.38 0.365 168.893 165.005a8 8 0 0 0 11.213-0.031l166.872-164.85c12.4-12.25 32.383-12.327 44.878-0.264l0.376 0.37c12.343 12.307 12.42 32.14 0.266 44.542l-0.372 0.374L546.76 657.256c-18.623 18.398-48.552 18.48-67.277 0.187l-185.931-181.65z"></path></svg> */}
                </>
                :
                (<ul style={{ width: "100%" }}>
                    {images.map((image) =>
                        <ImageList
                            key={image.id}
                            image={image}
                            isCollected={collectIds.includes(image.id)}
                            limit={limit}
                        />
                    )}
                </ul>)
            }
            {loading && (pageOffset !== 0) &&
                <div
                    className="loadinglist"
                    style={{ left: barWidth, width: window.innerWidth - barWidth }}>
                    <div className="loading-wrapper">
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                        <div className="loading-circle"></div>
                        <span>Loading</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Img;
