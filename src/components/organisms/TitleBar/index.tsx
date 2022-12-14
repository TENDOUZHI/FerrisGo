import './index.scss'
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Ferris from '@/assets/Ferris.png'
import minimizes from '@/assets/system/minimize.png'
import maxmizes from '@/assets/system/maxmize.png'
import shutdown from '@/assets/system/shutdown.png'
import { TitleMenu } from '@/components/molecules/TitleMenu';
import { invoke } from '@tauri-apps/api';
import { useSelector } from 'react-redux';
import { routesSliceAction, selectCurRoutes, selectVapp, selectWapp } from '@/store/vapp.slice';
import { useDispatch } from 'react-redux';
import { useRenderer } from '@/hooks/useRenderer';
import { VNode } from '@/store/ast';
import { selectRoot } from '@/store/source.slice';
import { useVprops } from '@/hooks/useVprops';
import { cacheSliceAction } from '@/store/cache.slice';
import { messageSliceAction } from '@/store/message.slice';
import { NewProject } from '@/components/molecules/NewProject';
import { selectUndo, undoSliceAction } from '@/store/undo.slice';
import { Blocking } from '@/components/molecules/Blocking';
import { blockSliceAction } from '@/store/block.slice';
import { useUpdate } from '@/hooks/useUpdate';
import { useBetterDiff } from '@/hooks/useBetterDiff';
import { selectTarget } from '@/store/target.slice';
import { useForever } from '@/hooks/useForever';
import { ContextMenu } from '../ContextMenu';

export const TitleBar = () => {
    const dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const current = useSelector(selectCurRoutes)
    const [saveFileData, undoFn] = useForever()
    const minimize = useRef<any>()
    const maxmize = useRef<any>()
    const closewindow = useRef<any>()
    const [secondMenu, setSecondMenu] = useState<boolean>(false)
    const [pathList, setPathList] = useState<Array<string>>([])
    const [path, setPath] = useState<boolean>(false)
    const [projectName, setProjectName] = useState<string>('')
    const [file, setFile] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [help, setHelp] = useState<boolean>(false)
    const [createProject, setCreateProject] = useState<boolean>(false)
    useEffect(() => {
        invoke('read_path_fn').then(res => {
            setPathList(res as Array<string>)
        })
        invoke('last_file_path').then(res => {
            let project_name: Array<string> = []
            let path = res as string
            path = path.replace(/\\/g, "/")
            for (let i = path.length - 5; i > 0; i--) {
                if (path[i] === '/') break;
                project_name.unshift(path[i])
            }
            setProjectName(project_name.join(''))
            dispatch(cacheSliceAction.initialLastPath(res))
        })
        minimize.current
            .addEventListener("click", () => appWindow.minimize());
        maxmize.current
            .addEventListener("click", () => appWindow.toggleMaximize());
        closewindow.current
            .addEventListener("click", () => appWindow.close());
    }, [])
    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key == 'z') {
                undoFn()
            }
        })
        // ctrl+s to save data
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 's') {
                saveFileData()
            }
        })
    }, [vapp])
    const showSecondMenu = () => {
        if (secondMenu) {
            setSecondMenu(false)
        } else {
            setSecondMenu(true)
            const hideMenu = () => {
                setSecondMenu(false)
                document.removeEventListener('click', hideMenu)
            }
            setTimeout(() => {
                document.addEventListener('click', hideMenu)
            })
        }
    }
    const showFileMenu = () => {
        setFile(true)
        setEdit(false)
        setHelp(false)
    }
    const showEditMenu = () => {
        setFile(false)
        setEdit(true)
        setHelp(false)
    }
    const showHelpMenu = () => {
        setFile(false)
        setEdit(false)
        setHelp(true)
    }
    const showPathMenu = () => {
        setPath(true)
    }

    const hidePathMenu = () => {
        setPath(false)
    }
    const close = () => {
        appWindow.close()
    }
    const newProject = () => {
        setCreateProject(true)
    }
    const readFileData = async (path: string) => {
        await invoke('read_file_data', { filePath: path }).then(res => {
            const data = JSON.parse(res as string)
            location.reload()
        })
    }
    const openDocumentBrowser = async () => {
        await invoke('open_doc_browser').then(
            () => dispatch(messageSliceAction.setCorrect('??????????????????')),
            () => dispatch(messageSliceAction.setError('??????????????????'))
        )
    }
    const exportProject = async () => {
        dispatch(blockSliceAction.setBlock())
        await invoke('vapp', { info: vapp }).then(res => {
            dispatch(blockSliceAction.stopBlock())
            dispatch(messageSliceAction.setCorrect('??????????????????'))
        }, () => {
            dispatch(blockSliceAction.stopBlock())
        })
    }


    return (
        <>
            <ContextMenu />
            <Blocking />
            <NewProject show={createProject} setShow={setCreateProject} />
            <div data-tauri-drag-region className="titlebar">
                <div className="titlebar_settings">
                    <div className="titlebar_settings_logo">
                        <img src={Ferris} alt="" />
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showFileMenu}>
                        <span >??????</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={file} width='280px'>
                            <div className="titlemenu_list" onClick={newProject}>
                                ????????????
                            </div>
                            <div className="titlemenu_list" onClick={saveFileData}>
                                <span>????????????</span>
                                <span>Ctrl+S</span>
                            </div>
                            <div className="titlemenu_list" onClick={exportProject}>
                                ????????????
                            </div>
                            <div className="titlemenu_list" onMouseEnter={showPathMenu} onMouseLeave={hidePathMenu}>
                                <span>?????????????????????</span>
                                <span>&gt;</span>
                                {/* @ts-ignore */}
                                <TitleMenu show={secondMenu} secShow={path} width='320px' left='100%' top='-10%'>
                                    {
                                        pathList.map((item, index) => {
                                            return <div className="titlemenu_list"
                                                onClick={() => readFileData(item)}
                                                key={index}>
                                                {item}
                                            </div>
                                        })
                                    }
                                </TitleMenu>
                            </div>
                            <div className="titlemenu_list" onClick={close}>
                                ??????
                            </div>
                        </TitleMenu>
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showEditMenu}>
                        <span >??????</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={edit} >
                            <div className="titlemenu_list" onClick={undoFn}>
                                <span>??????</span>
                                <span>Ctrl+Z</span>
                            </div>
                            <div className="titlemenu_list">
                                ??????
                            </div>
                            <div className="titlemenu_list">
                                ??????
                            </div>
                        </TitleMenu>
                    </div>
                    <div className="titlebar_settings_set">
                        <span>??????</span>
                    </div>
                    <div className="titlebar_settings_set">
                        <span>??????</span>
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showHelpMenu}>
                        <span>??????</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={help} >
                            <div className="titlemenu_list" onClick={openDocumentBrowser}>
                                ??????
                            </div>
                        </TitleMenu>
                    </div>
                </div>
                <div className="titlebar_projectname">
                    <span>{current.name}</span> <span style={{margin:'0 5px'}}>-</span> {projectName} <span className="titlebar_projectname_name">-</span> <span className="titlebar_projectname_name">FerrisGo</span>
                </div>
                <div className="titlebar-buttons">
                    <div className="titlebar-button" ref={minimize}>
                        <img
                            src={minimizes}
                            alt="minimize"
                        />
                    </div>
                    <div className="titlebar-button" ref={maxmize}>
                        <img
                            src={maxmizes}
                            alt="maximize"
                        />
                    </div>
                    <div className="titlebar-button titlebar-close" ref={closewindow}>
                        <img src={shutdown} alt="close" />
                    </div>
                </div>

            </div>
        </>
    )
}