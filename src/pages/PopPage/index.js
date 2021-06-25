import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { getPopList } from '../../models'
import { changeImgList, changeIsShow } from '../../store/actions'
import Img from '../Img/Img'
import Loading from '../Loading'

const PopPage = ({ barWidth }) => {
  const imgList = useSelector(state => state.img.imgList)
  const api = useSelector(state => state.api.api)
  const [showLoading, setShowLoading] = useState(false)
  const dispatch = useDispatch();
  const { date } = useParams()

  useEffect(() => {
    const limit = Math.floor((window.innerWidth - barWidth - 100) / 210) * 10
    const fetchList = async () => {
      const dateSplit = date.split('-')
      const defaultList = await getPopList(api, dateSplit, limit)
      window.scrollTo(0, 0)
      dispatch(changeImgList(defaultList))
      dispatch(changeIsShow(false))
      setShowLoading(false)
    }
    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, api, dispatch])

  return (
    <>
      {showLoading && <Loading />}
      <Img images={imgList} barWidth={barWidth} setShowLoading={setShowLoading} />
    </>
  )
}

export default PopPage
