import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
export interface device {
    id: number,
    name: string,
    width: number
}

interface State {
    device: device,
    deviceList: Array<device>
}

const initialState: State = {
    device: {
        id: 2,
        name: 'iPhone 6/7/8 (375 * 667 | Dpr: 2)',
        width: 375
    },
    deviceList: [
        {
            id: 1,
            name: 'iPhone 5 (320 * 568 | Dpr: 2)',
            width: 320
        },
        {
            id: 2,
            name: 'iPhone 6/7/8 (375 * 667 | Dpr: 2)',
            width: 375
        },
        {
            id: 3,
            name: 'iPhone 6/7/8 Plus (414 * 736 | Dpr: 3)',
            width: 414
        },
        {
            id: 4,
            name: 'iPhone X (375 * 812 | Dpr: 3)',
            width: 375
        },
        {
            id: 5,
            name: 'iPhone XR (414 * 896 | Dpr: 2)',
            width: 414
        },
        {
            id: 6,
            name: 'iPhone XS Max (414 * 896 | Dpr: 3)',
            width: 414
        },
        {
            id: 7,
            name: 'iPhone 12/13 mini (375 * 812 | Dpr: 3)',
            width: 375
        },
        {
            id: 8,
            name: 'iPhone 12/13 (Pro) (390 * 844 | Dpr: 3)',
            width: 390
        },
        {
            id: 9,
            name: 'iPhone 12/13 Pro Max (428 * 926 | Dpr: 3)',
            width: 428
        },
        {
            id: 10,
            name: 'Nexus 5 (360 * 640 | Dpr: 3)',
            width: 360
        },
        {
            id: 11,
            name: 'Nexus 5X (411 * 731 | Dpr: 2.625)',
            width: 411
        },
        {
            id: 12,
            name: 'Nexus 6 (412 * 732 | Dpr: 3.5)',
            width: 412
        },
        {
            id: 13,
            name: 'Windows (480 * 800 | Dpr: 2)',
            width: 480
        },
        {
            id: 14,
            name: 'Mac 13-inch and bellow (375 * 667 | Dpr: 2)',
            width: 375
        },
        {
            id: 15,
            name: 'Mac 15-inch (375 * 736 | Dpr: 2)',
            width: 375
        },
        {
            id: 16,
            name: 'Mac 21-inch and above (414 * 896 | Dpr: 2)',
            width: 414
        },
        {
            id: 17,
            name: 'iPad (768 * 1024 | Dpr: 2)',
            width: 768
        },
        {
            id: 18,
            name: 'Ipad Pro 10.5-inch (834 * 1112 | Dpr: 2)',
            width: 834
        },
        {
            id: 19,
            name: 'Ipad Pro 12.9-inch (1024 * 1366 | Dpr: 2)',
            width: 1024
        }

    ]
}

export const deviceSlice = createSlice({
    name: 'deviceSlice',
    initialState,
    reducers: {
        captureDevice(state, payload) {
            state.device = payload.payload
        }
    }
})

export const deviceSliceAction = deviceSlice.actions

export const selectDevice = (state: RootState) => state.deviceElement.device
export const selectDeviceList = (state: RootState) => state.deviceElement.deviceList