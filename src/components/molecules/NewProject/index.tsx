import './index.scss'
import folder from '@/assets/folder.png'
import { useEffect, useRef, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { useDispatch } from 'react-redux'
import { messageSliceAction } from '@/store/message.slice'
import { cacheSliceAction } from '@/store/cache.slice'

interface Props {
    show: boolean,
    setShow: ((value: boolean) => void)
}

export const NewProject = (props: Props) => {
    const dispatch = useDispatch()
    const [projectName, setProjectName] = useState<string>('')
    const [path, setPath] = useState<string>('')
    const project = useRef<any>()

    useEffect(() => {
        if(props.show) project.current.style.display = 'flex'
        else project.current.style.display = 'none'
    }, [props])

    const onChange = (e: { target: { value: string } }) => {
        setProjectName(e.target.value)
    }

    const selectPath = async () => {
        await invoke('select_file').then(res => {
            setPath(res as string)
        })
    }
    const cancel = () => {
        props.setShow(false)
    }

    const createProject = async () => {
        await invoke('create_project', {path, projectName}).then((res) => {
            dispatch(cacheSliceAction.initialLastPath(path))
            dispatch(messageSliceAction.setCorrect(res))
            location.reload()
        },(err) => {
            dispatch(messageSliceAction.setError(err))
        })
    }

    return (
        <div className="newproject" ref={project}>
            <div className="newproject_create">
                <div className="newproject_create_title">新建项目</div>
                <div className="newproject_create_name">
                    <span>项目名:</span>
                    <input type="text"
                        value={projectName}
                        onChange={onChange}
                    />
                </div>
                <div className="newproject_create_path">
                    <div className="newproject_create_path_show">{path}</div>
                    <div className="newproject_create_path_btn" onClick={selectPath}>
                        <img src={folder} alt="" />
                    </div>
                </div>
                <div className="newproject_create_choice">
                    <div className="newproject_create_choice_cancel newproject_btn" onClick={cancel}>取消</div>
                    <div className="newproject_create_choice_sure newproject_btn" onClick={createProject}>确定</div>
                </div>

            </div>
        </div>
    )
}