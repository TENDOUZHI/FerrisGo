import { RepItem } from '@/components/molecules/RepItem'
import { Item, ProgramDelete, ProgramInsert, repSliceAction, selectList } from '@/store/respository.slice'
import { selectUser, userSliceAction } from '@/store/user.slice'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './index.scss'
import { useNavigate } from 'react-router'
import { Loading } from '@/components/organisms/Loading'
import { messageSliceAction } from '@/store/message.slice'

export const Repository = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lists = useSelector(selectList)
    const user = useSelector(selectUser)
    const [show, setShow] = useState<boolean>(false)
    const [userAvatar, setUserAvatar] = useState<string>(user.avatar)
    const [loading, setLoading] = useState<boolean>(false)
    const userHead = useRef<any>()
    const layer = useRef<any>()
    const ulList = useRef<any>()
    useEffect(() => {
        document.title = 'Ferris-我的文件'
    }, [])
    useLayoutEffect(()=>{
        selectProgram()
        setUserAvatar(user.avatar)
    },[user])
    const selectProgram = async () => {
        const payload = {
            user_id: user.id
        }
        await axios.post('/programlist',payload).then((res) => {
            if (res.status === 200) {
                const { data } = res
                dispatch(repSliceAction.synListData(data.list))
            } else {
                dispatch(messageSliceAction.setError('获取文件信息失败'))
                setLoading(true)
                setTimeout(() => setLoading(false), 5000)
            }

        })
    }
    const createItem = async () => {
        const date = new Date().toLocaleDateString().replaceAll('/', '-')
        const payload: ProgramInsert = {
            user_id: user.id,
            name: 'New File',
            lastdate: date
        }
        await axios.post('/programlist/insert', payload).then((res) => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('创建项目成功'))
                selectProgram()
            } else {
                dispatch(messageSliceAction.setError('创建项目失败'))
            }
        })
    }
    const deleteItem = async (id: number) => {
        const payload: ProgramDelete = {
            id: id,
            user_id: user.id
        }
        await axios.post('/programlist/delete', payload).then((res) => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('删除项目成功'))
                selectProgram()
            } else {
                dispatch(messageSliceAction.setError('删除项目失败'))
            }
        })
    }
    const userList = () => {
        if (!show) {
            layer.current.style.display = 'block'
            setTimeout(() => {
                layer.current.classList.add('show-layer')
            })
            setShow(true)
            setTimeout(() => {
                document.addEventListener('click', hide)
            })
        }
        const hide = (e: MouseEvent) => {
            const set = new Set()
            try {
                ulList.current.childNodes.forEach((v: any) => {
                    set.add(v)
                })
            } catch (error) { }

            if (set.has(e.target)) {
                console.log(321);

            }
            layer.current.style.display = 'none'
            setTimeout(() => {
                layer.current.classList.remove('show-layer')
            })
            setShow(false)
            document.removeEventListener('click', hide)
        }
    }
    const logout = () => {
        dispatch(userSliceAction.logout())
        navigate('/login')
    }
    const userAccount = () => {
        navigate('/user')
    }
    const home = () => {
        navigate('/')
    }

    return (
        <div className="rep">
            <Loading loading={loading} />
            <div className="rep-head">
                <div className="rep-head-logo" onClick={home}>Ferris</div>
                <div className="rep-head-user">
                    <div className="rep-head-user-info" ref={userHead} onClick={userList}>
                        <div className="rep-head-user-info-avatar">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="rep-head-user-info-name">{user.username}</div>
                    </div>
                    <div className="rep-head-user-layer" ref={layer}>
                        <ul className="rep-head-user-layer-ul" ref={ulList}>
                            <li className="rep-head-user-layer-ul-li" onClick={userAccount}>
                                账号设置
                            </li>
                            <li className="rep-head-user-layer-ul-li" onClick={logout}>
                                退出登录
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="rep-file">
                <div className="rep-file-title">文件列表</div>
                <div className="rep-file-operate">
                    <div className="rep-file-operate-fun" onClick={createItem}>
                        创建文件+
                    </div>
                </div>
                <div className="rep-file-ul">
                    <div className="rep-file-ul-head">
                        <div className="rep-file-ul-head-name">名称</div>
                        <div className="rep-file-ul-head-time">更新时间</div>
                    </div>
                    {lists.map(item => <RepItem key={item.id} id={item.id} name={item.name} time={item.lastdate} deleteFun={deleteItem} />)}
                </div>
            </div>
        </div>
    )
}