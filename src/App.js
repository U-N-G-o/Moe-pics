import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import { getImgTagMap } from './utils/functions'
import './App.css';
import Top from './pages/Top/Top'
import SideBar from './pages/SideBar'
import IndexPage from './pages/IndexPage'
import SearchPage from './pages/SearchPage'
import CollectionPage from './pages/CollectionPage'
import RandomPage from './pages/RandomPage'
import PopPage from './pages/PopPage'
import Loading from './pages/Loading'

const App = () => {
    const isLoading = useSelector(state => state.showType.isShow)
    const imgList = useSelector(state => state.img.imgList)
    const [tags, setTags] = useState([]);
    const [barWidth, setBarWidth] = useState(300)

    useEffect(() => {
        const tagList = getImgTagMap(imgList)
        setTags(tagList)
    }, [imgList])

    return (

        <Router>
            {isLoading && <Loading />}
            <Top />
            <SideBar breeds={tags} setBarWidth={setBarWidth} />
            <Switch>
                <Route path="/collection">
                    <CollectionPage barWidth={barWidth} />
                </Route>
                <Route path="/random">
                    <RandomPage barWidth={barWidth} />
                </Route>
                <Route path="/popular/:date">
                    <PopPage barWidth={barWidth} />
                </Route>
                <Route path="/search/:tag">
                    <SearchPage barWidth={barWidth} />
                </Route>
                <Route path="/" >
                    <IndexPage barWidth={barWidth} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;
