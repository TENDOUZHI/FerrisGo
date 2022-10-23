import { Vapp } from "@/store/ast";

export const useSendWs = (wapp: Vapp, user_id: number, program_id: number, ws: WebSocket) => {
    // const text = 'user_id:' + user_id + ';'
    //     + 'program_id:' + program_id + ';'
    //     + 'project_name:' + wapp.project_name + ';'
    //     + 'lastdate:' + new Date().toLocaleDateString().replaceAll('/', '-') + ';'
    //     + JSON.stringify(wapp)
    // ws.send(text)
    // ws.onmessage = ((e) => {
    //     // console.log(e);
    // })
    // ws.onerror = (e) => {
    //     console.log(e);
    // }
}