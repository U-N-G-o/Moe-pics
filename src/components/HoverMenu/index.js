import React, { useEffect, useState, memo } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button'
import './style.css'

const HoverMenu = ({ position, btnList }) => {
    const [container] = useState(document.createElement('div'))

    useEffect(() => {
        document.body.appendChild(container)
        return () => {
            document.body.removeChild(container)
        }
    })

    const style = { top: position.y + 10, left: position.x - 50 }

    if (position.up) {
        style.top -= 8 * btnList.length
    }

    return createPortal(
        <>
            <ul className={position.up ? "hover-down-menu" : "hover-up-menu"}
                style={style}
            >
                {btnList.map((btn, i) =>
                    <Button key={i} info={btn.btnInfo} fn={btn.btnFn} />
                )}
            </ul>
        </>
        , container)
}

export default memo(HoverMenu);
