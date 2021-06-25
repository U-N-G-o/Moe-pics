import React, { useState, memo } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { changeIsShow } from '../../store/actions'
import { getDateFormat } from "../../utils/functions";

const DatePicker = () => {
  const [date, setDate] = useState(getDateFormat())
  const dispatch = useDispatch()
  const history = useHistory()

  const style = { width: "145px", marginRight: 0 }

  const setPopDate = (e) => {
    setDate(e.target.value)
    if (history.location.pathname !== "/popular/" + e.target.value) {
      dispatch(changeIsShow(true))
      history.push("/popular/" + e.target.value)
    }
  }

  return (
    <div className="icon delete" style={style} onClick={e => e.stopPropagation()}>
      <input type="date" value={date} onChange={e => setPopDate(e)} />
    </div>
  )
}

export default memo(DatePicker)
