import { useScroll } from '@/hooks/useScroll'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import buildPage from '@/assets/build page.png'
import autoSave from '@/assets/auto save.png'
import codeSet from '@/assets/code set.png'
import dataSafe from '@/assets/data safe.png'
import file from '@/assets/file.png'
import safepic from '@/assets/safe.png'
import safeensure from '@/assets/safe ensure.png'
import certain from '@/assets/certain.png'
import { useSelector } from 'react-redux'
import { selectUser, userSliceAction } from '@/store/user.slice'
import { useDispatch } from 'react-redux'
import { Loading } from '@/components/organisms/Loading'
import { Message } from '@/components/organisms/Message'

export const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const slide = useRef<any>()
    const slide2 = useRef<any>()
    const slide3 = useRef<any>()
    const slide4 = useRef<any>()
    const title = useRef<any>()
    const board = useRef<any>()
    const wechat = useRef<any>()
    const safe = useRef<any>()
    const btnUl = useRef<any>()
    const accountBtn = useRef<any>()
    const container = useRef<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const monitorScroll = () => {
        const scrollTop = Math.round(container.current.scrollTop)
        const target = 1000
        const rate = target / 500
        if (scrollTop >= 300) {
            title.current.style.height = 0
            board.current.style.transform = 'translateY(10%)'
        } else {
            title.current.style.height = '3rem'
            board.current.style.transform = 'translateY(30%)'
        }
        // controll slide1
        if (scrollTop >= 0 && scrollTop <= 1000) {
            slide.current.style.left = scrollTop - 1000 + 'px'
            slide.current.style.top = scrollTop - 1000 + 'px'
        } else if (scrollTop > 1000) {
            slide.current.style.left = 0 + 'px'
            slide.current.style.top = 0 + 'px'
        }
        // controll slide2
        if (scrollTop >= 100 && scrollTop <= 1100) {
            slide2.current.style.right = scrollTop - 1100 + 'px'
            slide2.current.style.top = scrollTop - 1100 + 'px'
        } else if (scrollTop > 1100) {
            slide2.current.style.right = 0 + 'px'
            slide2.current.style.top = 0 + 'px'
        }
        // controll slide3
        if (scrollTop >= 200 && scrollTop <= 1200) {
            slide3.current.style.left = scrollTop - 1200 + 'px'
            slide3.current.style.bottom = scrollTop - 1200 + 'px'
        } else if (scrollTop > 1200) {
            slide3.current.style.left = 0 + 'px'
            slide3.current.style.bottom = 0 + 'px'
        }
        // controll slide4
        if (scrollTop >= 300 && scrollTop <= 1300) {
            slide4.current.style.right = scrollTop - 1300 + 'px'
            slide4.current.style.bottom = scrollTop - 1300 + 'px'
        } else if (scrollTop > 1300) {
            slide4.current.style.right = 0 + 'px'
            slide4.current.style.bottom = 0 + 'px'
        }
    }
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((v, i) => {
            if (v.isIntersecting) {
                if (v.target === slide.current ||
                    v.target == slide2.current ||
                    v.target == slide3.current ||
                    v.target == slide4.current
                ) {
                    setTimeout(() => {
                        v.target.classList.add('cansee')
                    }, 100)
                } else {
                    v.target.classList.add('cansee')
                }

            } else {
                v.target.classList.remove('cansee')
            }
        })
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    })
    useEffect(() => {
        if (user.id === 0) {
            setTimeout(() => setLoading(false), 5000)
        } else {
            setLoading(false)
        }
    },[])
    useLayoutEffect(() => {
        document.title = 'Ferris-首页'
        io.observe(board.current)
        io.observe(slide.current)
        io.observe(slide2.current)
        io.observe(slide3.current)
        io.observe(slide4.current)
        io.observe(wechat.current)
        io.observe(safe.current)

    }, [])
    const btnEnter = () => {
        btnUl.current.style.display = 'block'
        accountBtn.current.style.height = '100px'
        accountBtn.current.style.transform = 'translateY(30%)'
        setTimeout(() => {
            btnUl.current.style.opacity = 1
            btnUl.current.style.top = '90%'
            btnUl.current.style.transform = 'scale(100%) translateY(10%)'
        }, 100)
    }
    const btnLeave = () => {
        accountBtn.current.style.height = '43px'
        accountBtn.current.style.transform = 'translateY(0%)'
        btnUl.current.style.display = 'none'
        btnUl.current.style.opacity = 0
        btnUl.current.style.top = '90%'
        btnUl.current.style.transform = 'scale(95%) translateY(0%)'
    }
    const accountSet = () => {
        navigate('/user')
    }
    const logout = () => {
        dispatch(userSliceAction.logout())
        navigate('/login')
    }
    return (
        <div className='homepage' onScroll={monitorScroll} ref={container}>
            <Loading loading={loading} title='Welcome to Ferris' />
            <div className="homepage-head">
                <div className="homepage-head-logo">Ferris</div>
                <ul className="homepage-head list-wrapper">
                    <li className="homepage-head-list">
                        优势所在
                    </li>
                    <li className="homepage-head-list">
                        帮助中心
                    </li>
                    <li className="homepage-head-list">
                        关于我们
                    </li>
                </ul>
                <div className="homepage-head-login">
                    {
                        user.isLogin

                            ? <div className="login-rep">
                                <div className="login-rep-main"
                                    onMouseEnter={btnEnter}
                                    onMouseLeave={btnLeave}
                                    ref={accountBtn}
                                >
                                    <Link to={'/repository'} className='login-rep-a'>
                                        <button className='login-rep-btn'>前往工作台</button>
                                    </Link>
                                    <ul className='login-rep-btn-ul' ref={btnUl}>
                                        <li className='login-rep-btn-ul-li' onClick={accountSet}>账号设置</li>
                                        <li className='login-rep-btn-ul-li' onClick={logout}>退出登录</li>
                                    </ul>
                                </div>

                            </div>


                            : <Link to={'/login'}><button>登录</button></Link>

                    }


                </div>
            </div>
            <div className="homepage-content">
                <div className="sticky">
                    <div className="sticky-wrapper1">
                        <div className="sticky-wrapper1-main">
                            <div className="sticky-wrapper1-main-title" ref={title}>
                                <p>自由创作,结构整洁</p>
                            </div>
                            <div className="wrapper1-center" ref={board}>
                                <div className="wrapper1-center-slide1 wrapper1-center-slide" ref={slide}>
                                    <div className="wrapper1-center-slide-title">随搭建页面</div>
                                    <div className="wrapper1-center-slide-img">
                                        <img src={buildPage} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide2 wrapper1-center-slide" ref={slide2}>
                                    <div className="wrapper1-center-slide-title">实时保存页面信息</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={autoSave} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide3 wrapper1-center-slide" ref={slide3}>
                                    <div className="wrapper1-center-slide-title">整洁的代码结构</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={codeSet} alt="" />
                                    </div>
                                </div>
                                <div className="wrapper1-center-slide4 wrapper1-center-slide" ref={slide4}>
                                    <div className="wrapper1-center-slide-title">数据安全</div>
                                    <div className="wrapper1-center-slide-img">

                                        <img src={dataSafe} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="sticky-wrapper2">
                        <div className="sticky-wrapper2-main">
                            <div className="sticky-wrapper2-main-wechat" ref={wechat}>
                                <div className="sticky-wrapper2-main-wechat-title">
                                    <p className='title-sub'>工具特点</p>
                                    <p className='title-main'>针对微信小程序进行定向优化</p>
                                </div>
                                <div className="sticky-wrapper2-main-wechat-content">
                                    <div className='wechat'>
                                        <p className='wechat-content'>直接生成.wxml .wxss文件 以及微信小程序配置文件 及出即用</p>
                                        <p className='wechat-content'>一键导出并下载文件</p>
                                    </div>

                                    <div className="wechat-img">
                                        <img src={file} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="sticky-wrapper2-main-safe" ref={safe}>
                                <div className="sticky-wrapper2-main-safe-title">
                                    <div className="safe-title">
                                        <p className="safe-title-sub">数据安全</p>
                                        <p className="safe-title-main">实时存储, 文件数据安全多重保障</p>
                                        <div className="safe-title-console">
                                            <div className="safe-title-console-block">
                                                <span className="safe-title-console-block-icon">
                                                    <img src={certain} alt="" />
                                                </span>
                                                <span className="safe-title-console-block-text">自动保存</span>
                                            </div>
                                            <div className="safe-title-console-block">
                                                <span className="safe-title-console-block-icon">
                                                    <img src={certain} alt="" />
                                                </span>
                                                <span className="safe-title-console-block-text">密码加密</span>
                                            </div>
                                            <div className="safe-title-console-block">
                                                <span className="safe-title-console-block-icon">
                                                    <img src={certain} alt="" />
                                                </span>
                                                <span className="safe-title-console-block-text">保存离线文件</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sticky-wrapper2-main-safe-content">
                                    <img src={safepic} alt="" />
                                    <img src={safeensure} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className='homepage-foot'>
                        <div className="homepage-foot-logo">Feirrs</div>
                    </footer>
                </div>
            </div>
        </div >
    )
}