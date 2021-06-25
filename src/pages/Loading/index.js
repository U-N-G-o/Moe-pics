import React from 'react'
import './style.css'

const Loading = () => {
  return (
    <div className="cover">
      <div className="loading-wrapper">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
        <div className="loading-shadow"></div>
        <span>Loading</span>
      </div>
    </div>
  )
}

export default Loading
