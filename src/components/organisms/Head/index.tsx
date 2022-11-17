import { Device } from '@/components/molecules/Device'
import { routesSliceAction, selectCurRoutes, selectVapp, selectWapp } from '@/store/vapp.slice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './index.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { selectUser, userSliceAction } from '@/store/user.slice'
import { selectWs } from '@/store/ws.slice'
import { useNavigate } from 'react-router'
import { Navigator } from '@/components/molecules/Navigator'
import setting from '@/assets/setting.png'
import { JumpLayer } from '@/components/molecules/JumpLayer'
import { selectNav } from '@/store/navigator.slice'
import { useForever } from '@/hooks/useForever'
import { DownLoad } from '@/components/molecules/DownLoad'
import { jumplayerSliceAction } from '@/store/jumplayer.slice'
import { RouterSet } from '@/components/atoms/RouterSet'
import { messageSliceAction } from '@/store/message.slice'
interface Props {
    id: number,
    title: string
}
export const Head = (props: Props) => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const wapp = useSelector(selectWapp)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const nav = useSelector(selectNav)
    const navigate = useNavigate()
    const [saveFileData] = useForever()
    const [progress, setProgress] = useState<number>(0)
    const [navigator, setNavigator] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const save = useRef<any>()
    const userAvatar = useRef<any>()
    const userList = useRef<any>()
    const settingList = useRef<any>()
    const bar = useRef<any>()
    const [title, setTitle] = useState<string>(vapp.project_name)
    const [count, setCount] = useState<number>(0)
    const [download, setDownload] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<string>(user.avatar)
    useEffect(() => {
        setTitle(vapp.project_name)
    }, [vapp])
    useLayoutEffect(() => {
        setAvatar(user.avatar)
    })
    useLayoutEffect(() => {
        const limit = 1000 * 60 * 3
        let record = 0
        setInterval(() => {
            // saveFileData()
            // dispatch(messageSliceAction.setCorrect('页面保存成功'))
        }, 1000 * 60 * 3)
        setInterval(() => {
            record++
            const remainTime = Math.round(limit / 1000) - record
            if (remainTime <= 10) {
                setCount(remainTime)
                save.current.style.top = '0%'
            }
            if (remainTime <= 0) {
                record = 0
                save.current.style.top = '-120%'
            }
        }, 1000)
    }, [])

    const click = async () => {
        setDownload(true)
        console.log('vapp', vapp);
        await axios.post('/vapp', wapp, { responseType: 'blob', onDownloadProgress: loadingProgress }).then((res) => {
            if (res.status === 200) {
                const blob = new Blob([res.data], { type: 'application/zip' })
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const name = wapp.project_name + '.zip'
                link.setAttribute('download', name);
                document.body.appendChild(link);
                setTimeout(() => {
                    setDownload(false)
                    link.click();
                    URL.revokeObjectURL(url) //realease memory
                }, 2000)
            }
        })
    }
    const loadingProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable) {
            setProgress(Math.round((evt.loaded * 100) / evt.total))
        }
    }
    const selectTitle = () => {
        bar.current.classList.add('show-bar')
    }
    const blurTitle = () => {
        bar.current.classList.remove('show-bar')
        const payload = {
            title: title,
            ws: ws,
            user_id: user.id,
            program_id: props.id
        }
        dispatch(routesSliceAction.updateProjectName(payload))
    }
    const updateTitle = (e: { target: { value: any } }) => {
        setTitle(e.target.value)
    }
    const handleSettingList = () => {
        if (!show) {
            settingList.current.style.display = 'block'
            setTimeout(() => {
                settingList.current.classList.add('etc_setting_list_move')
                document.addEventListener('click', hide)
            })
            setShow(true)
        }
    }
    const hide = () => {
        settingList.current.style.display = 'none'
        setTimeout(() => {
            settingList.current.classList.remove('etc_setting_list_move')
            document.removeEventListener('click', hide)
        })
        setShow(false)

    }

    const showNavigator = () => {
        dispatch(jumplayerSliceAction.setShow())
        dispatch(jumplayerSliceAction.setTitle('设置导航栏'))
        dispatch(jumplayerSliceAction.capChildren(<Navigator />))
    }
    const back = () => {
        navigate(-1)
    }
    const home = () => {
        navigate('/')
    }
    const account = () => {
        navigate('/user')
    }
    const logout = () => {
        dispatch(userSliceAction.logout())
        navigate('/login')
    }
    const showRouter = () => {
        dispatch(jumplayerSliceAction.setShow())
        dispatch(jumplayerSliceAction.setTitle('设置路由跳转'))
        dispatch(jumplayerSliceAction.capChildren(<RouterSet />))
    }


    return (
        <>
            <JumpLayer />
            <div className="head">
                <div className='head-title'>
                    <input className='head-title-input' type="text"
                        value={title}
                        onChange={updateTitle}
                        onFocus={selectTitle}
                        onBlur={blurTitle} />
                    <div className="bar" ref={bar}></div>
                </div>
                <div className="head_autosave" ref={save}>
                    <DownLoad download text='距离下次保存还有' count={count} />
                </div>
                <div className="device">
                    <Device program_id={props.id} />
                </div>
                <div className="etc">
                    <div className="etc_setting" onClick={handleSettingList}>
                        <div className="etc_setting_img" >
                            <img src={setting} alt="" draggable={false} />
                        </div>
                        <ul className="etc_setting_list" ref={settingList}>
                            <li className="etc_setting_list_li" onClick={showNavigator}>导航栏</li>
                            <li className="etc_setting_list_li" onClick={showRouter}>跳转路由</li>
                        </ul>
                    </div>
                    {/* <div className='download_btn' onClick={click}>
                        <DownLoad download={download} />
                    </div>
                    <div className="etc_user">
                        <div className="etc_user_avtar" ref={userAvatar} onClick={handleUserList}>
                            <img draggable={false} src={avatar} alt="" />
                        </div>
                        <ul className="etc_user_list" ref={userList}>
                            <li className="etc_user_list_li" onClick={back}>返回</li>
                            <li className="etc_user_list_li" onClick={home}>回到首页</li>
                            <li className="etc_user_list_li" onClick={account}>账号设置</li>
                            <li className="etc_user_list_li" onClick={logout}>退出登录</li>
                        </ul>
                    </div> */}
                </div>

            </div>
        </>
    )
}