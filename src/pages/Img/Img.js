import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { changePage } from '../../store/actions'
import './Img.css'
import ImageBox from '../../components/ImageBox'
import ImageList from '../../components/ImageList'

const Img = ({ images, barWidth, setShowLoading, limit }) => {
    const currentPage = useSelector((state) => state.img.currentPage)
    const hoverImgIds = useSelector(state => state.listWithTag.hasTag)
    const collectIds = useSelector(state => state.collectList.collectList)
    const showType = useSelector(state => state.showType.showType)

    const dispatch = useDispatch();

    const marginLeft = barWidth;

    const style = { marginLeft: marginLeft }

    const prePage = () => {
        if (currentPage === 1) {
            return
        } else {
            setShowLoading(true)
            dispatch(changePage(currentPage - 1))
        }
    }

    const nextPage = () => {
        setShowLoading(true)
        dispatch(changePage(currentPage + 1))
    }

    return (
        <div className={showType === 'grid' ? "mainbox grid" : "mainbox flexlist"} style={showType === 'grid' ? style : { flexDirection: 'column', alignItems: 'start', ...style }}>
            {showType === 'grid'
                ?
                <>
                    {images.map((image) =>
                        <ImageBox
                            key={image.id}
                            image={image}
                            isSelected={hoverImgIds.includes(image.id)}
                            isCollected={collectIds.includes(image.id)}
                        />
                    )}
                    <svg className="prebtn" onClick={prePage} style={currentPage === 1 ? { display: "none" } : style} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M64 512C64 264.576 264.576 64 512 64s448 200.576 448 448-200.576 448-448 448S64 759.424 64 512z m64 0c0 212.077 171.923 384 384 384s384-171.923 384-384-171.923-384-384-384-384 171.923-384 384z m165.552-36.207c-12.595-12.305-12.755-32.414-0.357-44.915 12.273-12.376 32.254-12.656 44.873-0.72l0.38 0.365 168.893 165.005a8 8 0 0 0 11.213-0.031l166.872-164.85c12.4-12.25 32.383-12.327 44.878-0.264l0.376 0.37c12.343 12.307 12.42 32.14 0.266 44.542l-0.372 0.374L546.76 657.256c-18.623 18.398-48.552 18.48-67.277 0.187l-185.931-181.65z"></path></svg>
                    <svg className="nextbtn" onClick={nextPage} style={(images.length < 50) ? { display: "none" } : null} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M64 512C64 264.576 264.576 64 512 64s448 200.576 448 448-200.576 448-448 448S64 759.424 64 512z m64 0c0 212.077 171.923 384 384 384s384-171.923 384-384-171.923-384-384-384-384 171.923-384 384z m165.552-36.207c-12.595-12.305-12.755-32.414-0.357-44.915 12.273-12.376 32.254-12.656 44.873-0.72l0.38 0.365 168.893 165.005a8 8 0 0 0 11.213-0.031l166.872-164.85c12.4-12.25 32.383-12.327 44.878-0.264l0.376 0.37c12.343 12.307 12.42 32.14 0.266 44.542l-0.372 0.374L546.76 657.256c-18.623 18.398-48.552 18.48-67.277 0.187l-185.931-181.65z"></path></svg>
                </>
                :
                (<ul style={{ width: "100%" }}>
                    {images.map((image) =>
                        <ImageList
                            key={image.id}
                            image={image}
                            isCollected={collectIds.includes(image.id)}
                            limit={limit}
                        />
                    )}
                </ul>)
            }
        </div>
    )
}

export default Img;
