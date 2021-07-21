import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { getImgList } from '../../models'
import { changeImgList, changeIsShow } from '../../store/actions'
import Img from '../Img/Img'
import Loading from '../Loading'

const IndexPage = ({ barWidth }) => {
    const imgList = useSelector(state => state.img.imgList)
    const currentPage = useSelector((state) => state.img.currentPage)
    const api = useSelector(state => state.api.api)
    const [showLoading, setShowLoading] = useState(false)
    const [limit, setLimit] = useState(50)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setShowLoading(true)
        const limit = Math.floor((window.innerWidth - barWidth - 120) / 260) * 10
        setLimit(limit)
        const fetchList = async (currentPage) => {
            const defaultList = await getImgList(api, currentPage, limit)
            history.push("/page=" + currentPage)
            window.scrollTo(0, 0)
            dispatch(changeImgList(defaultList))
            dispatch(changeIsShow(false))
            setShowLoading(false)
        }
        fetchList(currentPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, api])

    return (
        <>
            {showLoading && <Loading />}
            <Img images={imgList} barWidth={barWidth} setShowLoading={setShowLoading} limit={limit} />
        </>
    )
}

export default IndexPage
