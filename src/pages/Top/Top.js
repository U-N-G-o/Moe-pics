import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { changeShowType, changeIsShow, changeOffsety, changePage, changeApi } from '../../store/actions'
import { getSearchRes } from '../../models/index'
import { urlList } from '../../configs/config';
import CN from 'classnames'

import './Top.css';
import FloatList from '../../components/FloatList';


const Top = () => {
    const pageOffset = useSelector(state => state.showType.scrollTop)
    const api = useSelector(state => state.api.api)
    const [value, setValue] = useState('');
    const [ideaList, setIdeaList] = useState([])
    const [ideaVisable, setIdeaVisable] = useState(false)
    const showType = useSelector(state => state.showType.showType)
    const dispatch = useDispatch()
    const history = useHistory()
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchList = async (value) => {
            const defaultList = await getSearchRes(api, value)
            setIdeaList(defaultList)
        }
        fetchList(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, value])

    useEffect(() => {
        setIdeaVisable(false)
        document.querySelector('.search').blur()
        window.addEventListener('scroll', changeOffset)
        function changeOffset() {
            dispatch(changeOffsety(window.pageYOffset))
        }

        return () => { window.removeEventListener('scroll', changeOffset) }

    }, [pageOffset, dispatch])

    const onClickMain = () => {
        if (history.location.pathname !== "/page=1" && history.location.pathname !== "/") {
            setValue('')
            dispatch(changePage(1))
            const activeDom = document.querySelector(".title.active")
            if (!!activeDom) {
                activeDom.classList.remove("active")
            }
            dispatch(changeIsShow(true))
            history.push("/page=" + 1)
        } else {
            console.log("已在当前页")
        }
    }

    const onFocus = () => {
        const height = window.innerHeight;
        const rect = document.querySelector('input').getBoundingClientRect()

        let x = rect.right - 200
        let y = rect.bottom;

        if ((height - rect.bottom) < 300) {
            y = y - rect.height - 250;
        }

        setPosition({ x: x, y: y })
        setIdeaVisable(true)
    }

    const onBlur = () => {
        function clear() {
            setValue("")
            setIdeaVisable(false)
        }
        setTimeout(() => { clear() }, 100)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const onEnter = (e) => {
        if (e.which !== 13 || e.target.value === '') return;
        onSearch()
        document.querySelector('.search').blur()
    }

    const onSearch = () => {
        setIdeaVisable(false)
        if (history.location.pathname !== "/search/" + value) {
            setValue('')
            dispatch(changePage(1))
            dispatch(changeIsShow(true))
            history.push("/search/" + value + "/page=" + 1)
        } else {
            console.log("已在当前页")
        }
    }

    const onClickGrid = () => {
        dispatch(changeShowType("grid"))
    }

    const onClickList = () => {
        dispatch(changeShowType("list"))
    }

    const btnFn = (e, tag) => {
        e.preventDefault()
        setValue(tag)
        setIdeaVisable(false)
        if (history.location.pathname !== "/search/" + tag) {
            setValue('')
            dispatch(changePage(1))
            dispatch(changeIsShow(true))
            history.push("/search/" + tag + "/page=" + 1)
        } else {
            console.log("已在当前页")
        }
    }

    const getValue = (e) => {
        dispatch(changeApi(e.target.value))
        dispatch(changeIsShow(true))
    }

    return (
        <div className="top">
            <span className="mainicon" >
                <svg className="icon-cat" onClick={onClickMain} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M 841.68 367.41 c 15.33 -73.91 0 -141.29 0 -141.29 c -13.94 -26.96 -45.54 33.46 -45.54 33.46 l -42.76 -0.92 c -29.74 -38.12 -39.04 -39.04 -39.04 -39.04 c -23.23 -0.94 -6.51 131.98 -6.51 131.98 c -7.43 33.47 -60.42 40.9 -60.42 40.9 c -224 39.97 -188.68 324.4 -188.68 324.4 c -61.34 79.01 -173.02 11.65 -225.87 -8.37 c -59.8 -22.64 -81.08 -8.55 -89.22 -0.92 c -30.87 28.88 17.42 45.6 31.6 48.33 c 34.79 6.69 61.6 12.48 80.87 20.44 c 68.79 28.43 123.61 23.25 123.61 23.25 c 63.21 1.86 93.89 -21.37 93.89 -21.37 c 6.51 15.8 13.56 17.9 20.45 18.58 c 31.9 3.16 128.27 0 128.27 0 c 43.68 22.31 59.48 -9.29 59.48 -9.29 l 68.79 0.92 c 3.72 7.45 13.94 11.16 13.94 11.16 c 45.55 7.43 52.05 0 52.05 0 c 26.04 -14.88 -1.86 -29.74 -1.86 -29.74 c -22.31 -5.59 -19.51 -13.02 -19.51 -13.02 s 1.5 -25.12 -2.33 -70.17 c -2.66 -31.45 -9.7 -66.16 3.26 -79.48 c 16.27 -16.72 32.16 -57.89 38.11 -79 c 23.96 -85.12 -0.75 -121.41 7.42 -160.81 Z M 698.88 748.5 c 11.16 -8.37 17.66 -44.62 17.66 -44.62 c 11.16 5.59 19.53 44.62 19.53 44.62 c -23.25 5.58 -37.19 0 -37.19 0 Z" fill="#333333" p-id="11170"></path></svg>
                <select className="selector" value={api} onChange={(e) => getValue(e)}>
                    {urlList.map(item => <option key={item.name}>{item.name}</option>)}
                </select>
            </span>

            <div className="searchbar" >
                <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={e => handleChange(e)}
                    value={value}
                    onKeyPress={onEnter}
                />

                {ideaVisable && <FloatList position={position} list={ideaList} fn={btnFn} />}
                <svg className="icon-search" onClick={onSearch} viewBox="0 0 1060 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M155.025387 209.506185a157.134398 213.982806 76.8 1 0 416.658291-97.726319 157.134398 213.982806 76.8 1 0-416.658291 97.726319Z" fill="#CC9760" p-id="12047"></path><path d="M153.411461 642.612289a189.269774 213.982806 13.24 1 0 98.017178-416.589963 189.269774 213.982806 13.24 1 0-98.017178 416.589963Z" fill="#CC9760" p-id="12048"></path><path d="M819.637647 642.516129a189.269774 213.982806 13.24 1 0 98.017178-416.589964 189.269774 213.982806 13.24 1 0-98.017178 416.589964Z" fill="#CC9760" p-id="12049"></path><path d="M698.925643 317.209335a213.982806 157.134398 5.05 1 0 27.663528-313.048886 213.982806 157.134398 5.05 1 0-27.663528 313.048886Z" fill="#CC9760" p-id="12050"></path><path d="M999.065732 613.7468c3.711172-4.807655 7.16931-9.783999 10.374412-14.844688 1.686896-2.614689 3.373793-5.145034 4.976345-7.844068s2.952069-5.229379 4.38593-7.928413 3.879862-7.506689 5.735448-11.302206c0.927793-2.024276 1.855586-3.879862 2.699034-5.904137 2.361655-5.313724 4.470275-10.880482 6.494551-16.868964l1.771241-5.229379c2.024276-6.325861 3.964206-12.736068 5.482414-19.399308s2.614689-12.398688 3.542482-18.555861c16.868964-108.383093-42.17241-210.440324-138.747227-233.044735l-5.145034-1.096482a119.01054 119.01054 0 0 0 13.495171-45.293168c7.675379-86.45344-81.56144-164.978466-199.306808-175.352879C641.021975 44.840995 573.546119 66.770648 531.37371 105.400575c-44.027996-48.919995-133.264814-86.200405-215.669703-50.606891C228.744499 92.833197 246.79429 219.350426 143.387542 256.799526c-6.578896 2.361655 3.795517 13.326481 6.578896 19.652342C82.321893 297.116349 25.304795 357.50724 6.411556 438.140887a235.40639 235.40639 0 0 0-3.289448 92.779301c0 1.180827 0 2.27731 0.590414 3.373792 0.590414 3.120758 1.180827 6.157172 1.855586 9.277931 0 1.686896 0.759103 3.373793 1.180827 4.976344s1.265172 4.807655 1.939931 7.169309 1.180827 4.132896 1.855586 6.157172a49.00434 49.00434 0 0 0 1.771241 5.313724c0.843448 2.530345 1.686896 4.976344 2.61469 7.422344 0.421724 1.096483 0.843448 2.10862 1.349517 3.205103a196.860808 196.860808 0 0 0 46.305305 69.162752 102.141576 102.141576 0 0 1 32.810135 73.633027v91.514128a193.233981 193.233981 0 0 0 156.965708 186.317706 1410.582754 1410.582754 0 0 0 271.337283 25.303446 1411.763582 1411.763582 0 0 0 263.493215-24.038274 193.993084 193.993084 0 0 0 158.905639-187.835912v-77.597234a161.689018 161.689018 0 0 1 42.17241-107.455299c2.699034-3.036413 5.229379-6.157172 7.759723-9.362275z" fill="#FF6E83" p-id="12051"></path><path d="M1010.958351 566.429356c3.626827-4.807655 7.084965-9.699654 10.374413-14.760343 1.602552-2.614689 3.289448-5.145034 4.891999-7.844068s2.952069-5.229379 4.385931-7.928413 3.964206-7.506689 5.735448-11.386551l2.783379-5.819792c2.27731-5.398068 4.385931-10.880482 6.410206-16.868964l1.771241-5.229379c2.024276-6.325861 3.964206-12.736068 5.482413-19.399308s2.614689-12.398688 3.542483-18.55586c16.868964-108.383093-42.17241-210.440324-138.747228-233.12908l-5.145034-1.012138a117.576678 117.576678 0 0 0 13.495171-45.293168C933.614152 92.833197 844.377333 14.561205 726.631966 4.186792c-73.970406-6.578896-141.530606 15.350757-183.449982 53.980685-44.027996-48.919995-128.204125-70.933993-215.669702-50.606892C212.465949 34.719617 134.95306 125.052918 155.027127 209.566427a114.455919 114.455919 0 0 0 6.578896 19.652343c-67.475855 20.664481-124.408608 80.971026-143.386192 161.604673a236.165493 236.165493 0 0 0-3.289448 92.779301c0 1.096483 0.421724 2.27731 0.590413 3.373793 0.590414 3.120758 1.180827 6.157172 1.855586 9.27793 0 1.686896 0.759103 3.289448 1.180828 4.976344s1.265172 4.807655 1.939931 7.16931 1.180827 4.132896 1.855586 6.157172 1.096483 3.542482 1.771241 5.313723 1.686896 4.976344 2.614689 7.422344c0.421724 1.012138 0.843448 2.10862 1.349517 3.205104a197.619911 197.619911 0 0 0 46.305306 69.162751 101.972886 101.972886 0 0 1 32.810135 73.633027v91.598474a193.233981 193.233981 0 0 0 156.965708 186.317705 1410.582754 1410.582754 0 0 0 271.337283 25.303446A1411.763582 1411.763582 0 0 0 798.999821 953.150352a194.499153 194.499153 0 0 0 158.989984-187.835912v-78.271992a161.689018 161.689018 0 0 1 42.172409-107.4553c2.699034-3.036413 5.229379-6.157172 7.759724-9.362275z" fill="#FCF0E6" p-id="12052"></path><path d="M228.154085 200.119807c1.180827-41.244617 23.616549-92.779301 70.765303-116.901919 52.462477-26.990342 114.371575-9.699654 149.712054 19.821032 83.83875 70.174889 60.643925 246.286872-10.205723 277.241421s-213.223703-71.693096-210.271634-180.160534zM789.553201 685.355551c-20.580136 56.426684-147.434744 59.041373-255.902181 60.72827s-228.23708 4.132896-250.166733-49.00434c-28.086825-67.475855 98.767783-236.165493 251.51625-237.6837 149.543364-1.602552 279.68742 156.965708 254.552664 225.95977zM88.985134 489.253847c-15.772481-34.750065-17.543722-90.248956 19.230618-124.408608S199.982916 335.914966 233.636498 354.302136c69.078407 37.617789 88.224681 151.820674 43.100203 193.402671S121.289199 560.440874 88.985134 489.253847zM862.34278 351.856137c31.460618-14.844688 80.464957-13.663861 108.045713 18.808894 24.122618 28.255514 21.676619 68.319303 9.783999 94.297508-27.412066 59.716132-122.890401 83.754405-159.580398 48.666961s-18.55586-133.349159 41.750686-161.773363zM634.358734 105.316231c40.232479-30.195445 111.082127-44.787099 160.255156-7.844069 41.160272 30.870204 50.606891 85.188267 45.377513 122.890402C825.737128 323.853657 685.977763 404.909028 621.622666 368.219032S549.92957 168.743535 634.358734 105.316231z" fill="#F7999F" p-id="12053"></path><path d="M817.049612 799.642781m-65.1142 0a65.1142 65.1142 0 1 0 130.2284 0 65.1142 65.1142 0 1 0-130.2284 0Z" fill="#F7999F" p-id="12054"></path><path d="M846.992023 799.642781m-28.339859 0a28.339859 28.339859 0 1 0 56.679718 0 28.339859 28.339859 0 1 0-56.679718 0Z" fill="#FFFFFF" p-id="12055"></path><path d="M899.117121 385.847099m-28.339859 0a28.339859 28.339859 0 1 0 56.679718 0 28.339859 28.339859 0 1 0-56.679718 0Z" fill="#FFFFFF" p-id="12056"></path><path d="M695.002659 126.65547m-28.339859 0a28.339859 28.339859 0 1 0 56.679718 0 28.339859 28.339859 0 1 0-56.679718 0Z" fill="#FFFFFF" p-id="12057"></path><path d="M282.556494 154.995329m-28.33986 0a28.339859 28.339859 0 1 0 56.679719 0 28.339859 28.339859 0 1 0-56.679719 0Z" fill="#FFFFFF" p-id="12058"></path><path d="M127.277682 445.057162m-28.33986 0a28.339859 28.339859 0 1 0 56.679719 0 28.339859 28.339859 0 1 0-56.679719 0Z" fill="#FFFFFF" p-id="12059"></path></svg>
            </div>
            <div className="icon-bar">
                <div className={CN('move-cube', { 'active': showType !== "grid" })}></div>
                <div className="grid-icon" onClick={onClickGrid}>
                    <svg className={CN({ 'active': showType === "grid" })} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13121" width="20" height="20"><path d="M480 96v288c0 53-43 96-96 96H96c-53 0-96-43-96-96V96C0 43 43 0 96 0h288c53 0 96 43 96 96zM1024 96v288c0 53-43 96-96 96H640c-53 0-96-43-96-96V96c0-53 43-96 96-96h288c53 0 96 43 96 96zM480 640v288c0 53-43 96-96 96H96c-53 0-96-43-96-96V640c0-53 43-96 96-96h288c53 0 96 43 96 96zM1024 640v288c0 53-43 96-96 96H640c-53 0-96-43-96-96V640c0-53 43-96 96-96h288c53 0 96 43 96 96z" p-id="13122" ></path></svg>
                </div>
                <div className="list-icon" onClick={onClickList}>
                    <svg className={CN({ 'active': showType === "list" })} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2514" width="20" height="20"><path d="M1020 176H292c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h728c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM1020 544H292c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h728c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM1020 912H292c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h728c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM156 224H4c-2.2 0-4-1.8-4-4V68c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v152c0 2.2-1.8 4-4 4zM156 608H4c-2.2 0-4-1.8-4-4V452c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v152c0 2.2-1.8 4-4 4zM156 960H4c-2.2 0-4-1.8-4-4V804c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v152c0 2.2-1.8 4-4 4z" p-id="2515"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default Top;
