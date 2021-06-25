import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getRandomList } from '../../models'
import { changeImgList, changeIsShow } from '../../store/actions'
import Img from '../Img/Img'
import Loading from '../Loading'

const RandomPage = ({ barWidth }) => {
  const imgList = useSelector(state => state.img.imgList)
  const currentPage = useSelector((state) => state.img.currentPage)
  const api = useSelector(state => state.api.api)
  const [showLoading, setShowLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const limit = Math.floor((window.innerWidth - barWidth - 100) / 210) * 10
    setShowLoading(true)
    const fetchList = async (currentPage) => {
      const defaultList = await getRandomList(api, currentPage, limit)
      window.scrollTo(0, 0)
      dispatch(changeImgList(defaultList))
      dispatch(changeIsShow(false))
      setShowLoading(false)
    }
    fetchList(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, api, dispatch])

  return (
    <>
      {showLoading && <Loading />}
      <Img images={imgList} barWidth={barWidth} setShowLoading={setShowLoading} />
    </>
  )
}

export default RandomPage
