import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { User, userSliceAction } from './store/user.slice'
import { Message } from './components/organisms/Message'
import { Loading } from './components/organisms/Loading'
import { invoke } from '@tauri-apps/api'
export const Source = () => {
    const dispatch = useDispatch()
    const verifyUser = () => {
    }
    useEffect(() => {
            verifyUser()
            invoke('flush_operate')
    }, [])
    return (
        <Router>
            <Routes>
                <Route path='/' element={<WorkSpace />}></Route>
                <Route path='/loading' element={<Loading loading={true} />}></Route>
            </Routes>
            <Message/>
        </Router>
    )
}