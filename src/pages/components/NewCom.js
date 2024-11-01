import "./NewCom.css"
import { get, post } from "../../utils/request";
import { useEffect, useRef, useState } from "react";
import { traditionalized } from "../../utils/simpleTraditionalizedExchange";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ShareIcon from '@mui/icons-material/Share';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import InfoAlert from "../alert/infoAlert";

const NewCom = () => {
    const [classifyHide, setClassifyHide] = useState(0) // 分类隐藏开关
    const [listHide, setListHide] = useState(0) // 列表隐藏开关
    const [listCheck, setListCheck] = useState(0)
    const [newsType, setNewsType] = useState("") // 保存请求的新闻类型
    const [newsAllowRequest, setNewsAllowRequest] = useState(false) // 允许开始请求
    const [newsList, setNewsList] = useState([]) // 新闻列表
    const [page, setPage] = useState(1) // 新闻列表页码
    const [newsDebounce, setNewsDebounce] = useState(false)
    const [infoAlertOpen, setInfoAlertOpen] = useState(false)
    const [infoAlertText, setInfoAlertText] = useState("")
    const listScrollRef = useRef(null)

    const closeInfoAlert = () => {
        setInfoAlertOpen(false)
    }
    // 添加滚动事件监听器
    useEffect(() => {
        const handleScroll = (event) => {
            let element = event.target
            // 计算到底部的距离
            let distanceToBottom = element.scrollHeight - element.scrollTop - element.clientHeight
            if (distanceToBottom == 0 && newsDebounce) {
                setInfoAlertText("请勿频繁请求~")
                setInfoAlertOpen(true)
            }
            if (distanceToBottom == 0 && !newsDebounce) {
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
        if (!newsDebounce) {
            setNewsDebounce(true)
            getNewList(newsType)
        }
        console.log('我是page:', page)
    }, [page])
    const getNewList = (type) => {
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
                    setNewsDebounce(false)
                }, 5000);
            }
        })
    }
    const backClassify = () => {
        setNewsAllowRequest(false)
        setListHide(1)
        setNewsDebounce(false) // 关闭防抖
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
    const openUrl = (item) => {
        window.open(item.url, '_blank')
    }
    return (
        <div className="news-box">
            <InfoAlert alertOpen={infoAlertOpen} alertText={infoAlertText} handleClose={() => closeInfoAlert()} />
            <div className="news-box-title">{traditionalized('- 新闻板块 -')}</div>
            {
                listCheck == 0 &&
                <div className="news-classify-box">
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-1" : "news-classify-item-1-hide"].join(" ")} onClick={() => classifyCheck('top')}>{traditionalized('推荐')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-2" : "news-classify-item-2-hide"].join(" ")} onClick={() => classifyCheck('guonei')}>{traditionalized('国内')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-3" : "news-classify-item-3-hide"].join(" ")} onClick={() => classifyCheck('guoji')}>{traditionalized('国际')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-4" : "news-classify-item-4-hide"].join(" ")} onClick={() => classifyCheck('yule')}>{traditionalized('娱乐')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-5" : "news-classify-item-5-hide"].join(" ")} onClick={() => classifyCheck('tiyu')}>{traditionalized('体育')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-6" : "news-classify-item-6-hide"].join(" ")} onClick={() => classifyCheck('junshi')}>{traditionalized('军事')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-7" : "news-classify-item-7-hide"].join(" ")} onClick={() => classifyCheck('keji')}>{traditionalized('科技')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-8" : "news-classify-item-8-hide"].join(" ")} onClick={() => classifyCheck('caijing')}>{traditionalized('财经')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-9" : "news-classify-item-9-hide"].join(" ")} onClick={() => classifyCheck('youxi')}>{traditionalized('游戏')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-10" : "news-classify-item-10-hide"].join(" ")} onClick={() => classifyCheck('qiche')}>{traditionalized('汽车')}</div>
                    <div className={["news-classify-item-base control-content-center", classifyHide == 0 ? "news-classify-item-11" : "news-classify-item-11-hide"].join(" ")} onClick={() => classifyCheck('jiankang')}>{traditionalized('健康')}</div>
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
                            {traditionalized("数据请求次数已用尽")}
                        </div>
                    }
                    {
                        newsList.map(((item, index) => {
                            return (
                                <div className="news-list-item" key={index}>
                                    <div className="news-list-item-img">
                                        {
                                            item.thumbnail_pic_s ?
                                                <img src={item.thumbnail_pic_s} /> :
                                                <div className="news-list-item-img-lose">
                                                    <ImageNotSupportedIcon />
                                                    Picture Lose
                                                </div>
                                        }

                                    </div>
                                    <div className="news-list-item-content">
                                        <div className="news-list-item-content-title">{item.title}</div>
                                        <div>
                                            <div className="news-list-item-content-author">Author: {item.author_name}</div>
                                            <div className="news-list-item-content-time">Date: {item.date}</div>
                                        </div>
                                    </div>
                                    <div className="news-list-item-jump" onClick={() => openUrl(item)}>
                                        SOURCE
                                        <ShareIcon style={{ fontSize: '13px' }} />
                                    </div>
                                </div>
                            )
                        }))
                    }
                </div>
            }
        </div>
    )
}

export default NewCom