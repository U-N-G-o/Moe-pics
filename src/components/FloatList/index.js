import React, { useEffect, useRef, useState, memo } from 'react'
import Button from '../Button'
import './style.css'
import { createPortal } from 'react-dom'

const FloatList = ({ position, list, fn }) => {
  const [container] = useState(document.createElement('div'))
  const listDom = useRef(null)
  const style = { top: position.y + window.pageYOffset, left: position.x }

  const wh = window.innerHeight

  if (list.length === 50) {
    style.height = 400
  } else if (list.length >= 10) {
    style.height = 250
    if (wh - position.y < 240) {
      style.top -= 240 - wh + position.y
    }
  } else {
    style.height = list.length * 25 + 2
    if (wh - position.y < style.height) {
      style.top -= style.height - wh + position.y
    }
  }

  const styles = document.styleSheets[0]
  styles.insertRule(
    `@keyframes open{
      0%{
        height: 0;
        overflow: hidden;
      }
      100%{
        height: ${style.height}px;
        overflow: hidden;
      }
    }`, 0
  )

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
      styles.deleteRule(0)
    }
  })

  return createPortal(
    <>
      <ul className="idealist" style={style} ref={listDom}>
        {list.map(item =>
          <Button key={item.id} info={item.name} fn={(e) => fn(e, item.name)} />
        )}
      </ul>
    </>, container)
}

export default memo(FloatList)
