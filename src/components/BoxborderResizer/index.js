import React, { useState, memo } from 'react'
import './style.css'

const BoxborderResizer = ({ width, setWidth }) => {
    const value = width
    const [isActive, setIsActive] = useState(false)
    const [min, max] = [300, 400]

    const resizeFn = (e) => {
        e.preventDefault()
        const start = e.clientX
        const ratio = 1
        setIsActive(true)

        const onDrag = (e) => {
            const current = e.clientX
            const absChange = (current - start) * ratio
            const newValue = Math.max(Math.min(value + absChange, max), min)
            setWidth(newValue)
        }

        const onDragEnd = () => {
            document.removeEventListener('mousemove', onDrag)
            document.removeEventListener('mouseup', onDragEnd)
            setIsActive(false)
        }

        document.addEventListener('mousemove', onDrag)
        document.addEventListener('mouseup', onDragEnd)
    }

    return (
        <div
            className={isActive ? "border-resizer active" : "border-resizer"}
            onMouseDown={resizeFn}
            style={{ left: width }}
        >
        </div>
    )
}

export default memo(BoxborderResizer)
