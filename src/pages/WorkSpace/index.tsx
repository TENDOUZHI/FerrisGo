import { Canvas } from '@/components/organisms/Canvas'
import { Head } from '@/components/organisms/Head'
import { LeftList } from '@/components/organisms/LeftList'
import { Loading } from '@/components/organisms/Loading'
import { RighttList } from '@/components/organisms/RightList'
import { routesSliceAction } from '@/store/vapp.slice'
import { wsSliceAction } from '@/store/ws.slice'
import { getName } from '@tauri-apps/api/app'
import { readText, writeText } from '@tauri-apps/api/clipboard'
import { ask } from '@tauri-apps/api/dialog'
import { invoke } from '@tauri-apps/api/tauri'
import assert from 'assert'
import axios from 'axios'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './index.scss'
export const WorkSpace = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [programData, setProgramData] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    // const ws = useRef<WebSocket>(new WebSocket('ws://127.0.0.1:8080/program/ws'));
    // @ts-ignore
    const [programId, setProgramId] = useState<number>(0)
    // @ts-ignore
    const [name, setName] = useState<string>('Ferris')
    useEffect(() => {
        document.title = 'Ferris-工作台'
        // ws.current.onopen = () => {
        //     setLoading(false)
        // }

        // dispatch(wsSliceAction.initialWs(ws.current))
        dispatch(routesSliceAction.initialProgramId(programId))
    })
    const hi = async () => {
        // const yes = await ask('Are you sure?', 'Tauri');
        // const yes2 = await ask('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });
        // const appName = await getName()
        // console.log(appName);
        // await invoke('hello2').then(res => {
        //     console.log(res);
        // })
        
    }
    return (
        <div className='home'>
            {/* <Loading loading={loading}/> */}
            <Head id={programId} title={name} />
            <div className='home-content' onClick={hi}>
                <LeftList program_id={programId} />
                <Canvas programData={programData} program_id={programId} />
                <RighttList />
            </div>
        </div>
    )
}