import { selectUser } from '@/store/user.slice'
import { useSelector } from 'react-redux'
import './index.scss'
import { useLayoutEffect, useRef, useState } from 'react'
import safe from '@/assets/safe.png'
import tip from '@/assets/tip.png'
import { editInfo, UserLayer } from '@/components/molecules/UserLayer'
import { useNavigate } from 'react-router'
import { Message } from '@/components/organisms/Message'

export const UserAccount = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const main = useRef<any>()
    const [mailBind, setMailBind] = useState<boolean>(false)
    const [telBind, setTelBind] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [type, setType] = useState<editInfo>('username')
    const [userAvatar, setUserAvatar] = useState<string>(user.avatar)
    useLayoutEffect(() => {
        document.title = 'Ferris-账号设置'
        if (user.email) setMailBind(true)
        if (user.telephone) setTelBind(true)
        setUserAvatar(user.avatar)
    })
    const back = () => {
        navigate(-1)
    }
    const onChangeAvatar = () => {
        setType('avatar')
        setEdit(true)
    }
    const onChangeName = () => {
        setType('username')
        setEdit(true)
    }
    const onChangeMail = () => {
        setType('email')
        setEdit(true)
    }
    const onChangeTel = () => {
        setType('telephone')
        setEdit(true)
    }
    const disBindMail = () => {
        setType('disemail')
        setEdit(true)
    }
    const disBindTel = () => {
        setType('distel')
        setEdit(true)
    }
    return (
        <div className='userpage'>
            {edit && <UserLayer show={edit} setShow={setEdit} type={type} />}
            <header className='userpage_header'>
                <div className="userpage_header_back">
                    <button className="userpage_header_back_btn" onClick={back}>返回</button>
                </div>
            </header>

            <div className="userpage_main" ref={main}>
                <div className="userpage_main_content">
                    <div className="userpage_main_content_title">账号设置</div>
                    <div className="userpage_main_content_info">基本信息</div>
                    <div className="userpage_main_content_list">
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">
                                    <div className="userpage_main_content_list_item_left_head_avatar">
                                        <div className="userpage_main_content_list_item_left_head_avatar_img">
                                            <img src={userAvatar} alt="" />
                                        </div>
                                        <div className="userpage_main_content_list_item_left_head_avatar_main">头像</div>
                                    </div>

                                </div>
                                <div className="userpage_main_content_list_item_left_main">支持 2M 以内的 .JPG .PNG 格式</div>
                            </div>
                            <div className="userpage_main_content_list_item_right" onClick={onChangeAvatar}>修改头像</div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">姓名</div>
                                <div className="userpage_main_content_list_item_left_main">{user.username}</div>
                            </div>
                            <div className="userpage_main_content_list_item_right" onClick={onChangeName}>编辑姓名</div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">邮箱</div>
                                {
                                    mailBind
                                        ? <div className="userpage_main_content_list_item_left_main">{user.email}</div>
                                        : <div className="userpage_main_content_list_item_left_main">
                                            <img className="userpage_main_content_list_item_left_main_img" src={tip} alt="" />
                                            未绑定</div>
                                }

                            </div>
                            <div className="userpage_main_content_list_item_right">
                                {
                                    mailBind
                                        ? <span onClick={disBindMail}>解除绑定</span>
                                        : <span onClick={onChangeMail}>立即绑定</span>
                                }
                            </div>
                        </div>
                        <div className="userpage_main_content_list_item">
                            <div className="userpage_main_content_list_item_left">
                                <div className="userpage_main_content_list_item_left_head">手机</div>
                                {
                                    telBind
                                        ? <div className="userpage_main_content_list_item_left_main">{user.telephone}</div>
                                        : <div className="userpage_main_content_list_item_left_main">
                                            <img className="userpage_main_content_list_item_left_main_img" src={tip} alt="" />
                                            未绑定</div>
                                }
                            </div>
                            <div className="userpage_main_content_list_item_right">{
                                telBind
                                    ? <span onClick={disBindTel}>解除绑定</span>
                                    : <span onClick={onChangeTel}>立即绑定</span>
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}