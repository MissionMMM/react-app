import "./NewCom.css"
import { get } from "../../utils/request";
import { useEffect, useRef, useState } from "react";
import { traditionalized } from "../../utils/simpleTraditionalizedExchange";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ShareIcon from '@mui/icons-material/Share';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import InfoAlert from "../alert/infoAlert";
import Drawer from '@mui/material/Drawer';
import RichTextEditor from "./RichTextEditor";
import RecommendIcon from '@mui/icons-material/Recommend';
import PublicIcon from '@mui/icons-material/Public';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import CircularProgress from '@mui/material/CircularProgress'; // 加载动态框

const NewCom = () => {
    const [loadingBox, setLoadingBox] = useState(false)
    const [classifyHide, setClassifyHide] = useState(0) // 分类隐藏开关
    const [listHide, setListHide] = useState(0) // 列表隐藏开关
    const [listCheck, setListCheck] = useState(0)
    const [newsType, setNewsType] = useState("") // 保存请求的新闻类型
    const [newsAllowRequest, setNewsAllowRequest] = useState(false) // 允许开始请求
    const [openDrawer, setOpenDrawer] = useState(false) // 新闻详情弹窗盒子
    const [newsDetail, setNewsDetails] = useState({}) // 新闻详情数据
    const [newsList, setNewsList] = useState([]) // 新闻列表
    const [page, setPage] = useState(1) // 新闻列表页码
    const [newsDebounce, setNewsDebounce] = useState(true)
    const [newsDetailDebounce, setNewsDetailDebounce] = useState(true)
    const [infoAlertOpen, setInfoAlertOpen] = useState(false)
    const [infoAlertText, setInfoAlertText] = useState("")
    const listScrollRef = useRef(null)

    const getNewsDetail = (id) => {
        setLoadingBox(true)
        get("/instrument/newsDetail/", { uniqueKey: id }).then(res => {
            if (res.code == 200) {
                setNewsDetails(res.data.result)
                setOpenDrawer(true)
                setTimeout(() => {
                    setNewsDetailDebounce(true)
                }, 5000);
            } else {
                setInfoAlertText("请求次数今日已达上限~")
                setInfoAlertOpen(true)
            }
            setLoadingBox(false)
        })
    }

    const openNewsDetailBox = (id = "") => {
        // setOpenDrawer(true)
        if (newsDetailDebounce) {
            getNewsDetail(id)
            setNewsDetailDebounce(false)
        } else {
            setInfoAlertText("请勿频繁请求~")
            setInfoAlertOpen(true)
        }
        // console.log('我是openDrawerChange:', openDrawerChange[1])
    }
    const closeDrawer = () => {
        setNewsDetails({})
        setOpenDrawer(false)
    }

    const closeInfoAlert = () => {
        setInfoAlertOpen(false)
    }
    const getNewList = (type) => {
        setNewsDebounce(false)
        // type[String]: top/推荐，默认 | guonei/国内 | guoji/国际 | yule/娱乐 | tiyu/体育 | junshi/军事 | keji/科技 | caijing/财经 | youxi/游戏 | qiche/汽车 | jiankang/健康
        // page[Number]:当前页数,默认1,最大50
        // pageSize[Number]:每条返回条数,默认30,最大30
        setNewsType(type)
        get("/instrument/news/", { type: type, page: page, pageSize: 20 }).then(res => {
            if (res.code == 200) {
                if (newsList.length == 0) {
                    setNewsList(res.data.result.data)
                } else {
                    setNewsList(prevItems => [...prevItems, ...res.data.result.data])
                }
                setTimeout(() => {
                    // 防抖关闭
                    setNewsDebounce(true)
                }, 5000);
            } else {
                setInfoAlertText("请求次数今日已达上限~")
                setInfoAlertOpen(true)
            }
        })
    }
    // 添加滚动事件监听器
    useEffect(() => {
        const handleScroll = (event) => {
            let element = event.target
            // 计算到底部的距离
            let distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight
            if (distanceToBottom == 0 && !newsDebounce) {
                setInfoAlertText("请勿频繁请求~")
                setInfoAlertOpen(true)
            } else if (distanceToBottom == 0 && newsDebounce) {
                setPage(prevItems => prevItems + 1)
            }
        };
        const element = listScrollRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }
        // 清理函数，在组件卸载时移除事件监听器
        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [listScrollRef, listCheck, newsDebounce]); // 依赖于listScrollRef
    // 监听page变化 滚动加载
    useEffect(() => {
        if (!newsAllowRequest) return
        if (newsDebounce) {
            getNewList(newsType)
        }
    }, [page /*, newsDebounce, newsAllowRequest*/])// eslint-disable-line react-hooks/exhaustive-deps

    const backClassify = () => {
        setNewsAllowRequest(false)
        setListHide(1)
        setNewsDebounce(true) // 关闭防抖
    }
    useEffect(() => {
        if (listHide == 1) {
            setTimeout(() => {
                setClassifyHide(0)
                setListCheck(0)
                setPage(1)
                setNewsList([])
            }, 1500);
        }
    }, [listHide])
    const classifyCheck = (classify) => {
        setNewsAllowRequest(true)
        setClassifyHide(1)
        getNewList(classify) // 拉取新闻数据
    }
    useEffect(() => {
        if (classifyHide == 1) {
            setTimeout(() => {
                setListHide(0)
                setListCheck(1)
            }, 1500);
        }
    }, [classifyHide])
    const openUrl = (url) => {
        window.open(url, '_blank')
    }
    return (
        <div className="news-box">
            <div className="news-box-backgoundText">
                {/* 圣经 诗篇 第一节 */}
                <span>Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.
                </span><br />
                <span>But his delight is in the law of the LORD; and in his law doth he meditate day and night.
                </span><br />
                <span>And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.
                </span><br />
                <span>The ungodly are not so: but are like the chaff which the wind driveth away.
                </span><br />
                <span>Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.
                </span><br />
                <span>For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish.
                </span><br />
            </div>
            {loadingBox && <CircularProgress style={{ position: 'absolute', right: '20px', top: '20px', color: '#f12350' }} />}
            <InfoAlert alertOpen={infoAlertOpen} alertText={infoAlertText} handleClose={() => closeInfoAlert()} />
            <div className="news-box-title">{traditionalized('- 新闻板块 -')}</div>
            {
                listCheck == 0 &&
                <div className="news-classify-box">
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-1" : "news-classify-item-1-hide"].join(" ")} onClick={() => classifyCheck('top')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('推荐')}
                            <RecommendIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">RECOMMEND</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-2" : "news-classify-item-2-hide"].join(" ")} onClick={() => classifyCheck('guonei')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('国内')}
                            <LocalActivityIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">LOCAL</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-3" : "news-classify-item-3-hide"].join(" ")} onClick={() => classifyCheck('guoji')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('国际')}
                            <PublicIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">GLOBAL</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-4" : "news-classify-item-4-hide"].join(" ")} onClick={() => classifyCheck('yule')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('娱乐')}
                            <AutoAwesomeIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">RECREATION</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-5" : "news-classify-item-5-hide"].join(" ")} onClick={() => classifyCheck('tiyu')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('体育')}
                            <SportsBasketballIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">SPORTS</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-6" : "news-classify-item-6-hide"].join(" ")} onClick={() => classifyCheck('junshi')}>
                        {/* MilitaryTechIcon */}
                        <div className="news-classify-item-text-1">
                            {traditionalized('军事')}
                            <MilitaryTechIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">MILITARY</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-7" : "news-classify-item-7-hide"].join(" ")} onClick={() => classifyCheck('keji')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('科技')}
                            <DeveloperBoardIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">TECHNOLOGY</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-8" : "news-classify-item-8-hide"].join(" ")} onClick={() => classifyCheck('caijing')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('财经')}
                            <MonetizationOnIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">FINANCE</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-9" : "news-classify-item-9-hide"].join(" ")} onClick={() => classifyCheck('youxi')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('游戏')}
                            <SportsEsportsIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">GAMES</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-10" : "news-classify-item-10-hide"].join(" ")} onClick={() => classifyCheck('qiche')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('汽车')}
                            <DirectionsCarIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">CAR</div>
                    </div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-11" : "news-classify-item-11-hide"].join(" ")} onClick={() => classifyCheck('jiankang')}>
                        <div className="news-classify-item-text-1">
                            {traditionalized('健康')}
                            <MedicationLiquidIcon className="news-classify-item-icon" />
                        </div>
                        <div className="news-classify-item-text-2">HEALTH</div>
                    </div>
                </div>
            }
            {
                listCheck == 1 &&
                <ReplyAllIcon className={["news-classify-back", listHide == 0 ? "news-classify-back-show" : "news-classify-back-hide"].join(" ")} style={{ fontSize: '36px' }} onClick={() => backClassify()} />
            }
            {
                listCheck == 1 &&
                <div className={["news-list-box", listHide == 0 ? "news-list-box-show" : "news-list-box-hide"].join(" ")} ref={listScrollRef}>
                    {
                        newsList.length == 0 &&
                        <div className="news-list-nothing">
                            <DoDisturbAltIcon style={{ fontSize: '80px', marginBottom: '10px' }} />
                            {traditionalized("暂无数据")}
                        </div>
                    }
                    {
                        newsList.map(((item, index) => {
                            return (
                                <div className="news-list-item" key={index}>
                                    <div className="news-list-item-img">
                                        {
                                            item.thumbnail_pic_s ?
                                                <img alt="" src={item.thumbnail_pic_s} /> :
                                                <div className="news-list-item-img-lose">
                                                    <ImageNotSupportedIcon />
                                                    Picture Lose
                                                </div>
                                        }

                                    </div>
                                    <div className="news-list-item-content">
                                        <div className="news-list-item-content-title" onClick={() => { openNewsDetailBox(item.uniquekey) }}>{item.title}</div>
                                        <div>
                                            <div className="news-list-item-content-author">Author: {item.author_name}</div>
                                            <div className="news-list-item-content-time">Date: {item.date}</div>
                                        </div>
                                    </div>
                                    <div className="news-list-item-jump" onClick={() => openUrl(item.url)}>
                                        SOURCE
                                        <ShareIcon style={{ fontSize: '13px' }} />
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
            }
            {/* 新闻详情盒子 */}
            <Drawer
                anchor="top"
                open={openDrawer}
                onClose={() => closeDrawer()}
            >
                {
                    Object.keys(newsDetail).length > 0 &&
                    <div className="news-detail-box">
                        <div className="news-detail-title">{newsDetail.detail.title}</div>
                        <div className="news-detail-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Author：{newsDetail.detail.author_name}</div>
                            <div>Category：{newsDetail.detail.category}</div>
                            <div>Date：{newsDetail.detail.date}</div>
                        </div>
                        <RichTextEditor value={newsDetail.content} />
                        <div className="news-detail-footer-jumpSource" onClick={() => openUrl(newsDetail.detail.url)}>来源<ShareIcon style={{ fontSize: '20px' }} />：{newsDetail.detail.url}</div>
                    </div>
                }
            </Drawer>
        </div>
    )
}

export default NewCom