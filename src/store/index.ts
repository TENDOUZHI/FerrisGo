import { configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "./device.slice";
import { routesSlice } from "./vapp.slice";
import { sourceSlice } from "./source.slice";
import { targetSlice } from "./target.slice";
import { userSlice } from "./user.slice";
import { repSlice } from "./respository.slice";
import { wsSlice } from "./ws.slice";
import { messageSlice } from "./message.slice";

export const rootReducer = {
        sourceElement: sourceSlice.reducer,
        targetElement: targetSlice.reducer,
        deviceElement: deviceSlice.reducer,
        routesElement: routesSlice.reducer,
        userElement: userSlice.reducer,
        repElement: repSlice.reducer,
        wsElemeent: wsSlice.reducer,
        messageElement: messageSlice.reducer
}

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck: false
        }),
})

export type AppDistpatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>