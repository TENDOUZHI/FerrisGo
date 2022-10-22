import { PassCodePayload } from '@/store/ast'
import { selectUser } from '@/store/user.slice'
import axios from 'axios'
import { MouseEvent, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import defaultAvatar from '@/assets/default-avatar.png'
import './index.scss'
import { useDispatch } from 'react-redux'
import { messageSliceAction } from '@/store/message.slice'
export type editInfo = 'avatar' | 'username' | 'email' | 'telephone' | 'disemail' | 'distel'
interface Props {
    type: editInfo,
    show: boolean,
    setShow: ((value: boolean) => void)
}
export const UserLayer = (props: Props) => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const layer = useRef<any>()
    const main = useRef<any>()
    const reader = useRef<FileReader>(new FileReader())
    const [username, setUsername] = useState<string>(user.username)
    const [password, setPassword] = useState<string>('')
    const [passcode, setPasscode] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [avatar, setAvatar] = useState<string>(defaultAvatar)
    const [title, setTitle] = useState<string>(() => {
        switch (props.type) {
            case 'avatar':
                return '修改头像'
            case 'username':
                return '修改用户名'
            case 'email':
                return '绑定邮箱'
            case 'telephone':
                return '绑定手机号'
            case 'disemail':
                return '解绑邮箱'
            case 'distel':
                return '解绑手机号'
            default:
                return ''
        }
    })
    const hide = (e: MouseEvent) => {
        if (e.target !== main.current) {
            props.setShow(false)
        }
    }
    const operateSucc = () => {
        setTimeout(() => {
            props.setShow(false)
            location.reload()
        }, 500)

    }
    useLayoutEffect(() => {
        setTimeout(() => {
            main.current.classList.add('main_show')
        })
    })
    const avatarOnChange = (e: { target: { value: any, files: any } }) => {
        const file = e.target.files[0]
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            reader.current.readAsDataURL(file)
            reader.current.onload = (res) => {
                const size = Math.round(res.total / 1024)
                if (size <= 2000) {
                    setAvatar(res.target?.result as string)
                } else {
                    dispatch(messageSliceAction.setError('文件大小不得大于2M'))
                    console.error('文件大于2M');
                }
            }
        } else {
            return
        }
    }
    const usernameOnChange = (e: { target: { value: any } }) => {
        setUsername(e.target.value)
    }
    const mailOnChange = (e: { target: { value: any } }) => {
        setMail(e.target.value)
    }
    const telOnChange = (e: { target: { value: any } }) => {
        setTel(e.target.value)
    }
    const passwordOnChange = (e: { target: { value: any } }) => {
        setPassword(e.target.value)
    }
    const passcodeOnChange = (e: { target: { value: any } }) => {
        setPasscode(e.target.value)
    }
    const sendPasscode = async () => {
        const payload: PassCodePayload = {
            email_address: mail,
            is_login: user.isLogin
        }
        await axios.post('/passcode', payload).then(res => {
            console.log('passcode', res);

        })
    }
    const sendRequest = () => {
        switch (props.type) {
            case 'avatar':
                updateAvatar()
                break;
            case 'username':
                updateUsername()
                break;
            case 'email':
                updateMail()
                break;
            case 'telephone':
                updateTel()
                break;
            default:
                break;
        }
    }
    const updateAvatar = async () => {
        const payload = {
            user_id: user.id,
            avatar: avatar
        }
        await axios.post('/update/avatar', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('修改用户头像成功'))
                operateSucc()
            }
        },(res)=>{
            dispatch(messageSliceAction.setError('修改用户头像失败'))
        })
    }
    const updateUsername = async () => {
        const payload = {
            user_id: user.id,
            username: username
        }
        await axios.post('/update/username', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('修改用户名成功'))
                operateSucc()
            } else {
                dispatch(messageSliceAction.setError('修改用户名失败'))
            }
        })
    }
    const updateMail = async () => {
        const payload = {
            user_id: user.id,
            mail,
            passcode,
            password
        }
        await axios.post('/update/mail', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('绑定用户邮箱成功'))
                operateSucc()
            } else {
                dispatch(messageSliceAction.setError('绑定用户邮箱失败'))
            }

        })
    }
    const updateTel = async () => {
        const payload = {
            user_id: user.id,
            telephone: tel,
            password
        }
        await axios.post('/update/tel', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('修改手机号成功'))
                operateSucc()
            } else {
                dispatch(messageSliceAction.setError('修改手机号失败'))
            }

        })
    }
    const disBind = () => {
        switch (props.type) {
            case 'disemail':
                disBindMail()
                break;
            case 'distel':
                disBindTel()
                break;
            default:
                break;
        }
    }
    const disBindMail = async () => {
        const payload = {
            user_id: user.id
        }
        await axios.post('/disbind/mail', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('解绑用户邮箱成功'))
                operateSucc()
            } else {
                dispatch(messageSliceAction.setError('解绑用户邮箱失败'))
            }

        })
    }
    const disBindTel = async () => {
        const payload = {
            user_id: user.id
        }
        await axios.post('/disbind/tel', payload).then(res => {
            if (res.status === 200) {
                dispatch(messageSliceAction.setCorrect('解绑手机号成功'))
                operateSucc()
            } else {
                dispatch(messageSliceAction.setError('解绑手机号失败'))
            }

        })
    }
    return (
        <div className="userlayer">
            <div className="userlayer_main" ref={main}>
                <header className='userlayer_main_header'>
                    <div className="userlayer_main_header_title">{title}</div>
                    <div className="userlayer_main_header_btn" onClick={hide}>x</div>
                </header>
                <div className="userlayer_main_content avatar_content">
                    {
                        props.type === 'avatar' &&
                        <div className="userlayer_main_content_avatar">
                            <div className="userlayer_main_content_avatar_tips">
                                <p className="userlayer_main_content_avatar_tips_main">点击或拖拽到此处上传</p>
                                <p className="userlayer_main_content_avatar_tips_sub">支持2M 以内的 .JPG .PNG 图片格式</p>
                            </div>
                            <input type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                className="userlayer_main_content_avatar_input"
                                placeholder='321'
                                onChange={avatarOnChange}
                            />
                            <div className="userlayer_main_content_avatar_forsee">
                                <img src={avatar} alt="" />
                                <span className="userlayer_main_content_avatar_forsee_text">头像预览</span>
                            </div>

                        </div>
                    }
                    {
                        props.type === 'username' &&
                        <div className="userlayer_main_content_username">
                            <input type="text" className='content_input' value={username} onChange={usernameOnChange} />
                        </div>
                    }
                    {
                        props.type === 'email' &&
                        <>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入邮箱'
                                    value={mail}
                                    onChange={mailOnChange} />
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入验证码'
                                    value={passcode}
                                    onChange={passcodeOnChange} />
                                <div className='passcode_btn' onClick={sendPasscode}>发送验证码</div>
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入密码'
                                    value={password}
                                    onChange={passwordOnChange} />
                            </div>
                        </>
                    }
                    {
                        props.type === 'telephone' &&
                        <>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入手机号'
                                    value={tel}
                                    onChange={telOnChange} />
                            </div>
                            <div className="userlayer_main_content_username">
                                <input type="text" className='content_input'
                                    placeholder='输入密码'
                                    value={password}
                                    onChange={passwordOnChange} />
                            </div>
                        </>
                    }
                    {
                        props.type === 'disemail' &&
                        <>
                            <div className="userlayer_main_content_disbind">
                                解绑之后将无法通过该邮箱进行登录, 请谨慎操作!
                            </div>
                        </>
                    }
                    {
                        props.type === 'distel' &&
                        <>
                            <div className="userlayer_main_content_disbind">
                                解绑之后将无法通过该手机号进行登录, 请谨慎操作!
                            </div>
                        </>
                    }
                </div>
                <footer className='userlayer_main_footer'>
                    <div className="userlayer_main_footer_cancel userlayer_main_footer_btn" onClick={hide}>取消</div>
                    {
                        (props.type === 'avatar' || props.type === 'username' || props.type === 'email' || props.type === 'telephone')
                            ? <div className="userlayer_main_footer_certain userlayer_main_footer_btn" onClick={sendRequest}>确定</div>
                            : <div className="  userlayer_main_footer_dismiss" onClick={disBind}>仍然解绑</div>
                    }

                </footer>
            </div>
            <div className="userlayer_shadow" ref={layer} onClick={hide}></div>
        </div>
    )
}