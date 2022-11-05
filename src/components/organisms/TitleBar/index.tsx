import './index.scss'
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useRef, useState } from 'react';
import Ferris from '@/assets/Ferris.png'
import minimizes from '@/assets/system/minimize.png'
import maxmizes from '@/assets/system/maxmize.png'
import shutdown from '@/assets/system/shutdown.png'
import { TitleMenu } from '@/components/molecules/TitleMenu';
import { invoke } from '@tauri-apps/api';
import { useSelector } from 'react-redux';
import { routesSliceAction, selectVapp, selectWapp } from '@/store/vapp.slice';
import { useDispatch } from 'react-redux';
import { useRenderer } from '@/hooks/useRenderer';
import { VNode } from '@/store/ast';
import { selectRoot } from '@/store/source.slice';
import { useVprops } from '@/hooks/useVprops';
import { cacheSliceAction } from '@/store/cache.slice';
import { messageSliceAction } from '@/store/message.slice';
import { NewProject } from '@/components/molecules/NewProject';

export const TitleBar = () => {
    let dispatch = useDispatch()
    const vapp = useSelector(selectVapp)
    const wapp = useSelector(selectWapp)
    const root = useSelector(selectRoot)
    const vprops = useVprops()
    const minimize = useRef<any>()
    const maxmize = useRef<any>()
    const closewindow = useRef<any>()
    const [secondMenu, setSecondMenu] = useState<boolean>(false)
    const [pathList, setPathList] = useState<Array<string>>([])
    const [lastFilePath, setLastFilePath] = useState<string>('')
    const [file, setFile] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [help, setHelp] = useState<boolean>(false)
    const [path, setPath] = useState<boolean>(false)
    const [createProject, setCreateProject] = useState<boolean>(false)
    useEffect(() => {
        invoke('read_path_fn').then(res => {
            setPathList(res as Array<string>)
        })
        invoke('last_file_path').then(res => {
            console.log(res);
            setLastFilePath(res as string)
            dispatch(cacheSliceAction.initialLastPath(res))
        })
        minimize.current
            .addEventListener("click", () => appWindow.minimize());
        maxmize.current
            .addEventListener("click", () => appWindow.toggleMaximize());
        closewindow.current
            .addEventListener("click", () => appWindow.close());
    }, [])
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
    const saveFileData = async () => {
        const data = JSON.stringify(vapp)
        const project_name = vapp.project_name
        // console.log(project_name);
        await invoke('save_file_data', { data: data }).then(res => {
            console.log(res);
            dispatch(messageSliceAction.setCorrect('保存成功'))
        }, () => {
            dispatch(messageSliceAction.setError('保存失败'))
        })
    }
    const readFileData = async (path: string) => {
        await invoke('read_file_data', { filePath: path }).then(res => {
            const data = JSON.parse(res as string)
            console.log(data);
        })
    }
    const openDocumentBrowser = async () => {
        await invoke('open_doc_browser').then(
            () => dispatch(messageSliceAction.setCorrect('打开文档成功')),
            () => dispatch(messageSliceAction.setError('打开文档失败'))
        )
    }
    const exportProject = async () => {
        await invoke('vapp', { info: vapp }).then(res => {
            dispatch(messageSliceAction.setCorrect('项目导出成功'))
        })
    }
    // ctrl+s to save data
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 's') {
            saveFileData()
        }
    })

    return (
        <>
            <NewProject show={createProject} setShow={setCreateProject} />
            <div data-tauri-drag-region className="titlebar">
                <div className="titlebar_settings">
                    <div className="titlebar_settings_logo">
                        <img src={Ferris} alt="" />
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showFileMenu}>
                        <span >文件</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={file} width='280px'>
                            <div className="titlemenu_list" onClick={newProject}>
                                新建项目
                            </div>
                            <div className="titlemenu_list" onClick={saveFileData}>
                                <span>保存文件</span>
                                <span>Ctrl+S</span>
                            </div>
                            <div className="titlemenu_list" onClick={exportProject}>
                                导出项目
                            </div>
                            <div className="titlemenu_list" onMouseEnter={showPathMenu} onMouseLeave={hidePathMenu}>
                                <span>打开最近的文件</span>
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
                                退出
                            </div>
                        </TitleMenu>
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showEditMenu}>
                        <span >编辑</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={edit} >
                            <div className="titlemenu_list">
                                撤销
                            </div>
                            <div className="titlemenu_list">
                                回复
                            </div>
                            <div className="titlemenu_list">
                                剪切
                            </div>
                        </TitleMenu>
                    </div>
                    <div className="titlebar_settings_set">
                        <span>选择</span>
                    </div>
                    <div className="titlebar_settings_set">
                        <span>查看</span>
                    </div>
                    <div className="titlebar_settings_set" onClick={showSecondMenu} onMouseEnter={showHelpMenu}>
                        <span>帮助</span>
                        {/* @ts-ignore */}
                        <TitleMenu show={secondMenu} secShow={help} >
                            <div className="titlemenu_list" onClick={openDocumentBrowser}>
                                文档
                            </div>
                        </TitleMenu>
                    </div>
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