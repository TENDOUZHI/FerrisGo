import { Input } from '@/components/molecules/Input'
import { LoginPayload, PassCodePayload } from '@/store/ast'
import { messageSliceAction } from '@/store/message.slice'
import { selectUser, User, userSliceAction } from '@/store/user.slice'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export const Card = () => {
    type LoginWay = 'passcode' | 'password'
    type InputType = 'text' | 'password'
    type Status = 'error' | 'normal' | 'correct'
    type CardType = 'login' | 'register'
    type LinkMsg = '立即注册' | '立即登录'
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const slide = useRef<any>()
    const passcode = useRef<any>()
    const password = useRef<any>()
    const switchFrame = useRef<any>()
    const card = useRef<any>()
    const btn = useRef<any>()
    const register = useRef<any>()
    const inputFrame = useRef<any>()
    const titleMain = useRef<any>()
    const titleSub = useRef<any>()
    const inputForm = useRef<any>()
    const [account, setAccount] = useState<string>('');
    const [cipher, setCipher] = useState<string>('');
    const [username, setUsername] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [loginType, setLoginType] = useState<LoginWay>('passcode')
    const [accountMsg, setAccountMsg] = useState<string>('邮箱不能为空')
    const [cipherMsg, setCipherMsg] = useState<string>('')
    const [accountTip, setAccountTip] = useState<string>('请输入邮箱')
    const [cipherTip, setCipherTip] = useState<string>('请输入验证码')
    const [accountStatus, setAccountStatus] = useState<Status>('normal')
    const [cipherStatus, setCipherStatus] = useState<Status>('normal')
    const [usernameStatus, setUsernameStatus] = useState<Status>('normal')
    const [passwordStatus, setPasswordStatus] = useState<Status>('normal')
    const [inputType, setInputType] = useState<InputType>('text')
    const [remAcount, setRemAcount] = useState<boolean>(false)
    const [emailType, setEmailType] = useState<'邮箱验证码登陆' | '邮箱注册'>('邮箱验证码登陆')
    const [telType, setTelType] = useState<'账号密码登录' | '手机注册'>('账号密码登录')
    const [title, setTitle] = useState<'登录' | '注册'>('登录')
    const [cardType, setCardType] = useState<CardType>('login')
    const [linkMsg, setLinkMsg] = useState<LinkMsg>('立即注册')
    const [btnType, setBtnType] = useState<'登录' | '下一步' | '注册'>('登录')
    let [second, setSecond] = useState<number>(59)
    const EmailReg = /^[a-zA-Z0-9][a-zA-Z0-9_]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/
    const telReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    useEffect(() => {
        btn.current.disabled = true
        register.current.disabled = true
        card.current.classList.add('show-card')

        showContent([
            titleMain.current,
            titleSub.current,
            switchFrame.current,
            inputForm.current.childNodes[0],
            inputForm.current.childNodes[1],
            inputForm.current.childNodes[2],
            inputForm.current.childNodes[3]
        ])
    }, [])
    // check is account validate
    useEffect(() => {
        if (loginType === 'passcode') {
            if (EmailReg.test(account)) {
                setAccountStatus('correct')
                setShow(true)
            } else {
                setAccountStatus('error')
                setShow(false)
            }
        } else {
            if (cardType === 'login') {
                if (EmailReg.test(account) || telReg.test(account)) {
                    setAccountStatus('correct')
                    setShow(true)
                } else {
                    setAccountStatus('error')
                    setShow(false)
                }
            } else if (cardType === 'register') {
                if (telReg.test(account)) {
                    setAccountStatus('correct')
                } else {
                    setAccountStatus('error')
                    setShow(false)
                }
            }

        }

    }, [account, cardType, loginType])

    useEffect(() => {
        validateCipher()
    }, [cipher, cardType, loginType])
    useEffect(() => {
        validateUsername()
    }, [username, cardType, loginType])
    useEffect(() => {
        validatePassword()
    }, [pwd, cardType, loginType])
    useEffect(() => {
        if (cardType === 'login') {
            if (accountStatus === 'correct' && cipherStatus === 'correct') {
                btn.current.disabled = false
            } else {
                btn.current.disabled = true
            }
        } else if (cardType === 'register') {
            if (loginType === 'passcode') {
                if (accountStatus === 'correct' && cipherStatus === 'correct') {
                    btn.current.disabled = false
                } else {
                    btn.current.disabled = true
                }
            } else if (loginType === 'password') {
                if (accountStatus === 'correct') {
                    btn.current.disabled = false
                } else {
                    btn.current.disabled = true
                }
            }
        }

    }, [accountStatus, cipherStatus])
    useEffect(() => {
        if (usernameStatus === 'correct' && passwordStatus === 'correct') {
            register.current.disabled = false
        } else {
            register.current.disabled = true
        }
    }, [usernameStatus, passwordStatus])
    const validateAccount = () => {
        if (loginType === 'passcode') {
            if (EmailReg.test(account)) {
                setAccountStatus('correct')
            } else if (account.length !== 0) {
                setAccountStatus('error')
                setAccountMsg('邮箱格式不正确')
            }
        } else {
            if (cardType === 'login') {
                if (EmailReg.test(account) || telReg.test(account)) {
                    setAccountStatus('correct')
                } else if (account.length !== 0) {
                    setAccountStatus('error')
                    setAccountMsg('账号格式不正确')
                }
            } else if (cardType === 'register') {
                if (telReg.test(account)) {
                    setAccountStatus('correct')
                } else if (account.length !== 0) {
                    setAccountStatus('error')
                    setAccountMsg('手机号不正确')
                }
            }

        }
    }
    const showContent = (dom: Array<HTMLElement>) => {
        let wait = 400
        dom.forEach((value) => {
            value.style.opacity = '0'
        })
        dom.forEach((value) => {
            setTimeout(() => {
                value.classList.add('fade-contnet')
                value.style.opacity = '1'
                setTimeout(() => {
                    value.classList.remove('fade-contnet')
                }, wait)

            }, wait)
            wait += 70
        })
    }
    const validateCipher = () => {
        if (loginType === 'passcode') {
            if (cipher.length === 6) {
                setCipherStatus('correct')
            } else {
                setCipherStatus('error')
                setCipherMsg('验证码为6位')
            }

        } else {
            if (cipher.length >= 6 && cipher.length <= 20) {
                setCipherStatus('correct')
            } else {
                setCipherStatus('error')
                setCipherMsg('密码是6-20位的')
            }
        }
    }
    const validateUsername = () => {
        if (username.length <= 20) {
            setUsernameStatus('correct')
        } else {
            setUsernameStatus('error')
        }
    }
    const validatePassword = () => {
        if (pwd.length >= 6 && pwd.length <= 20) {
            setPasswordStatus('correct')
        } else {
            setPasswordStatus('error')
        }
    }

    const switchPasscode = () => {
        slide.current.classList.add('slide-bounce')
        setTimeout(() => {
            slide.current.classList.remove('slide-bounce')
        }, 300)
        btn.current.disabled = true
        passcode.current.classList.add('switch_button')
        password.current.classList.remove('switch_button')
        initialCard()
        setLoginType('passcode')
        setNormal()
        setAccountMsg('邮箱不能为空')
        switch (cardType) {
            case 'login':

                break;
            case 'register':

                break;

            default:
                break;
        }
        setAccountTip('输入邮箱')
        setCipherTip('输入验证码')
        setInputType('text')
        setShow(false)
    }
    const switchPassword = () => {
        slide.current.classList.add('slide-bounce')
        setTimeout(() => {
            slide.current.classList.remove('slide-bounce')
        }, 300)
        btn.current.disabled = true
        password.current.classList.add('switch_button')
        passcode.current.classList.remove('switch_button')
        setAccount('')
        setCipher('')
        setShow(false)
        slide.current.style.left = '50%'
        slide.current.style.width = '48%'
        setLoginType('password')
        setNormal()
        setCipherTip('输入密码(6-20个字符)')
        setInputType('text')
        switch (cardType) {
            case 'login':
                setAccountTip('输入手机号或邮箱')
                setAccountMsg('账号不能为空')
                break;
            case 'register':
                setAccountTip('输入手机号')
                setAccountMsg('手机号不能为空')
                break;

            default:
                break;
        }
    }
    const switchCard = () => {
        initialCard()
        setNormal()
        switchPasscode()
        setShow(false)
        card.current.classList.remove('show-card')
        card.current.classList.add('switch-card')
        setTimeout(() => {
            card.current.classList.remove('switch-card')
        }, 500)
        switch (cardType) {
            case 'login':
                setCardType('register')
                setTimeout(() => {
                    setLinkMsg('立即登录')
                    setTitle('注册')
                    setEmailType('邮箱注册')
                    setTelType('手机注册')
                    setBtnType('下一步')
                })
                switchFrame.current.style.width = '12rem'
                break;

            case 'register':
                setCardType('login')
                backStep()
                setTimeout(() => {
                    setLinkMsg('立即注册')
                    setTitle('登录')
                    setEmailType('邮箱验证码登陆')
                    setTelType('账号密码登录')
                    setBtnType('登录')
                }, 100)

                switchFrame.current.style.width = '18rem'
                break;

            default:
                break;
        }
    }
    const setNormal = () => {
        setAccountStatus('normal')
        setCipherStatus('normal')
        setUsernameStatus('normal')
        setPasswordStatus('normal')
    }
    const initialCard = () => {
        btn.current.disabled = true
        slide.current.style.left = '0%'
        slide.current.style.width = '50%'
        setAccount('')
        setCipher('')
    }
    const nextStep = () => {
        if (cardType === 'register') {
            inputFrame.current.style.transform = 'translateX(-57%)'
            // setNormal()
        }
    }
    const backStep = () => {
        inputFrame.current.style.transform = 'translateX(0%)'
        // setNormal()
    }
    const loginFun = async () => {
        if (cardType === 'login' && accountStatus === 'correct' && cipherStatus === 'correct') {
            const payload: LoginPayload = {
                username: null,
                telephone: null,
                email: null,
                message: null,
                emessage: null,
                password: null
            }
            // ensure login payload
            if (loginType === 'passcode') {
                payload.email = account
                payload.emessage = cipher
            } else if (loginType === 'password') {
                if (telReg.test(account)) {
                    // telephone login
                    payload.telephone = account
                    payload.password = cipher
                } else if (EmailReg.test(account)) {
                    // email login
                    payload.email = account
                    payload.password = cipher
                }
            }
            await axios.post('/login', payload).then((res) => {
                const { data } = res
                if (data.status === 200) {
                    const userInfo: User = {
                        id: data.id,
                        username: data.username,
                        avatar: data.avatar,
                        email: data.email,
                        telephone: data.telephone,
                        token: data.token,
                        isLogin: true
                    }
                    dispatch(userSliceAction.synUserData(userInfo))
                    localStorage.setItem('user', JSON.stringify(res.data))
                    if (remAcount) {
                    }
                    navigate('/repository')
                } else {
                    dispatch(messageSliceAction.setError(data.message))
                }

            })

        }
    }
    const sedPassCode = async (passType: string, setPassType: (value: string) => void, passBtn: HTMLElement) => {
        const payload: PassCodePayload = {
            email_address: '',
            is_login: true
        }
        if (loginType === 'passcode' && accountStatus === 'correct') {
            payload.email_address = account
        }
        await axios.post('/passcode', payload).then((res) => {
            if (res.status === 200) {
                let counter = setInterval(() => {
                    passBtn.classList.add('pass-disabled')
                    setPassType(second + 's后重新获取')
                    setSecond(second = second - 1)
                    if (second < 0) {
                        passBtn.classList.remove('pass-disabled')
                        setPassType('重新获取')
                        setSecond(second = 59)
                        clearInterval(counter)
                    }
                }, 1000)

            }
        }, (res) => {
            dispatch(messageSliceAction.setError('发送验证码失败'))

        })

    }
    const registerFun = async () => {
        if (cardType === 'register' &&
            usernameStatus === 'correct' &&
            passwordStatus === 'correct') {
            const payload: LoginPayload = {
                username: null,
                telephone: null,
                email: null,
                message: null,
                emessage: null,
                password: null
            }
            if (loginType === 'passcode') {
                payload.username = username
                payload.email = account
                payload.emessage = cipher
                payload.password = pwd
            } else if (loginType === 'password') {
                payload.username = username
                payload.telephone = account
                payload.password = pwd
            }
            await axios.post('/register', payload).then((res) => {
                if (res.status === 200) {
                    location.reload()
                    navigate('/login')
                }
            }, (res) => {
                dispatch(messageSliceAction.setError(res.response.data))
            })


        }
    }

    return (<div className="card" ref={card}>
        <div className="card-title" >
            <span className="card-title-main" ref={titleMain}>{title}您的账户</span>
            <div className="card-title-sub" ref={titleSub}>
                <span className="card-title-sub-tip">没有账号？</span>
                <span className="card-title-sub-link" onClick={switchCard}>{linkMsg}</span>
            </div>
        </div>
        <div className="card-input" ref={inputFrame}>
            <div className="card-input-account">
                <div className="input-switch" ref={switchFrame}>
                    <span className="input-switch-passcode " ref={passcode} onClick={switchPasscode}>{emailType}</span>
                    <span className="input-switch-password" ref={password} onClick={switchPassword}>{telType}</span>
                    <div className="input-switch-slide" ref={slide}></div>
                </div>
                <div className="input-form" ref={inputForm}>
                    <Input
                        value={account}
                        setValue={setAccount}
                        validateFun={validateAccount}
                        placeholder={accountTip}
                        input_type='text'
                        status={accountStatus}
                        msg={accountMsg}
                        passcode={false}
                        show={true} />
                    <Input
                        value={cipher}
                        setValue={setCipher}
                        validateFun={validateCipher}
                        passCodeFun={sedPassCode}
                        placeholder={cipherTip}
                        input_type={inputType}
                        passcode={loginType === 'passcode'}
                        status={cipherStatus}
                        msg={cipherMsg}
                        show={show} />
                    {cardType === 'login' && <div className="input-form-remember">
                        <input
                            type="checkbox"
                            name="acount"
                            id="rem"
                            onChange={() => setRemAcount(!remAcount)}
                            checked={remAcount} />
                        <label htmlFor="rem">记住账号</label>
                    </div>}
                    <button className="input-form-submit"
                        onClick={() => { nextStep(); loginFun() }}
                        ref={btn}
                    >
                        {btnType}
                    </button>
                </div>
            </div>
            <div className="login-right-card-input-username">
                <div className="input-form">
                    <Input
                        value={username}
                        setValue={setUsername}
                        validateFun={validateUsername}
                        placeholder={'输入用户名'}
                        input_type={''}
                        show={true}
                        passcode={false}
                        msg={'用户名不正确'}
                        status={usernameStatus}
                    />
                    <Input
                        value={pwd}
                        setValue={setPwd}
                        validateFun={validatePassword}
                        placeholder={'输入密码(6-20个字符)'}
                        input_type={''}
                        show={true}
                        passcode={false}
                        msg={'密码是介于6-20位'}
                        status={passwordStatus}
                    />
                    <div className="input-form-reg">
                        <button className="input-form-reg-back" onClick={backStep}>上一步</button>
                        <button className="input-form-reg-register" ref={register} onClick={registerFun}>注册</button>
                    </div>
                </div>

            </div>
        </div>

    </div>)
}