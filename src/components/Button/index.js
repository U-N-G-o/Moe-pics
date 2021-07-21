import React from 'react'
import './style.css'

const Button = ({ info, fn }) => {

    const onHover = (e) => {
        const eDom = e.target
        let boxWidth = 200
        // if (eDom.parentNode.scrollHeight > 240) {
        //     boxWidth = 181
        // }
        const rect = eDom.getBoundingClientRect()
        const startCarousel = () => {
            eDom.setAttribute('style', `
            transition: transform 1.2s;
            transform: translateX(${boxWidth - rect.width}px)
            `)
            setTimeout(() =>
                eDom.setAttribute('style', `
                transition: transform 1.2s;
                transform: translateX(0px)
            `), 1000)
        }

        if (rect.width > boxWidth) {
            eDom.addEventListener('transitionend', () => { startCarousel(); })
            startCarousel()
        }
    }

    const offHover = (e) => {
        const eDom = e.target
        eDom.removeAttribute('style')
    }


    return (
        <li
            className="my-button"
            onClick={(e) => fn(e)}
            onMouseEnter={(e) => onHover(e)}
            onMouseLeave={(e) => offHover(e)}
        >
            {info}
        </li>
    )
}

export default Button