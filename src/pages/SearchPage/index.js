import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { getSelectedImgList } from '../../models'
import { changeImgList, changeIsShow } from '../../store/actions'
import Img from '../Img/Img'
import Loading from '../Loading'

const SearchPage = ({ barWidth }) => {
    const imgList = useSelector(state => state.img.imgList)
    const currentPage = useSelector((state) => state.img.currentPage)
    const api = useSelector(state => state.api.api)
    const [showLoading, setShowLoading] = useState(false)
    const dispatch = useDispatch();
    const { tag } = useParams()
    const history = useHistory()
    const pathname = history.location.pathname
    const path = pathname.substr(0, pathname.indexOf('='))

    useEffect(() => {
        setShowLoading(true)
        window.scrollTo(0, 0)
        const limit = Math.floor((window.innerWidth - barWidth - 100) / 210) * 10
        const fetchList = async (currentPage) => {
            const selectdedList = await getSelectedImgList(api, tag, currentPage, limit)
            history.push(path + "=" + currentPage)
            dispatch(changeImgList(selectdedList))
            dispatch(changeIsShow(false))
            setShowLoading(false)
        }
        fetchList(currentPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, tag, currentPage])

    return (
        <>
            {showLoading && <Loading />}
            <Img images={imgList} barWidth={barWidth} setShowLoading={setShowLoading} />
        </>
    )
}

export default SearchPage
