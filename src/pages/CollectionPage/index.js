import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { collections } from '../../models'
import { changeImgList, changeIsShow } from '../../store/actions'

import Img from '../Img/Img'

const CollectionPage = ({ barWidth }) => {
  const imgList = useSelector(state => state.img.imgList)
  const dispatch = useDispatch();

  useEffect(() => {
    const collectList = collections()
    dispatch(changeImgList(collectList))
    dispatch(changeIsShow(false))
  }, [dispatch])

  return (
    <>
      <Img images={imgList} barWidth={barWidth} />
    </>
  )
}

export default CollectionPage
