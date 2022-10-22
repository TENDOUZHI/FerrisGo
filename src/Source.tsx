import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { User, userSliceAction } from './store/user.slice'
import { Message } from './components/organisms/Message'
export const Source = () => {
    const dispatch = useDispatch()
    const verifyUser = () => {
    }
    useEffect(() => {
            verifyUser()
    }, [])
    return (
        <Router>
            <Routes>
                <Route path='/' element={<WorkSpace />}></Route>
            </Routes>
            <Message/>
        </Router>
    )
}