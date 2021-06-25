import React, { useEffect, useState, memo } from 'react'
import Button from '../Button'
import './style.css'
import { createPortal } from 'react-dom'

const FloatList = ({ position, list, fn }) => {
  const [container] = useState(document.createElement('div'))
  const style = { top: position.y + window.pageYOffset, left: position.x }

  const wh = window.innerHeight

  if (list.length === 50) {
    style.height = 400
  } else if (list.length > 10) {
    if (wh - position.y < 240) {
      style.top -= 240 - wh + position.y
    }
  } else {
    style.height = list.length * 23.5
    if (wh - position.y < style.height) {
      style.top -= style.height - wh + position.y
    }
  }

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  })

  return createPortal(
    <>
      <div className="idealist" style={style}>
        {list.map(item =>
          <Button key={item.id} info={item.name} fn={(e) => fn(e, item.name)} />
        )}
      </div>
    </>, container)
}

export default memo(FloatList)
