import React from 'react'
import './Dialog.css'

const Dialog = ({ showDialog, setShowDialog }) => {
    const { title, type, message, confirm } = showDialog

    const onConfirm = () => {
        if (!!confirm) {
            confirm()
        }
        setShowDialog({ isShow: false })
    }

    const onCancel = () => {
        setShowDialog({ isShow: false })
    }

    return (
        <div className="cover">
            {type === "img" ?
                (<div className="swiper">
                    <button className="close" onClick={onCancel} style={{ fontSize: "5em", position: "absolute", top: "6vh", right: "10vw" }}>×</button>
                    <img className="showpic" alt="" src={message} />
                </div>
                )
                :
                (<div className="mydialog">
                    <div className="head">
                        <span className="dialog-title">{title}</span>
                        <button className="close" onClick={onCancel}>×</button>
                    </div>
                    <div className="content">{message}</div>
                    <div className="footer">
                        <button className="btn confirm" onClick={onConfirm}>确认</button>
                        <button className="btn confirm" onClick={onCancel}>取消</button>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Dialog;
