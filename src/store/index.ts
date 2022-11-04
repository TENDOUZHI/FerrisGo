import { configureStore } from "@reduxjs/toolkit";
import { deviceSlice } from "./device.slice";
import { routesSlice } from "./vapp.slice";
import { sourceSlice } from "./source.slice";
import { targetSlice } from "./target.slice";
import { userSlice } from "./user.slice";
import { repSlice } from "./respository.slice";
import { wsSlice } from "./ws.slice";
import { messageSlice } from "./message.slice";
import { swiperSlice } from "./swiper.slice";
import { imageSlice } from "./image.slice";
import { iconSlice } from "./icon.slice";
import { cacheSlice } from "./cache.slice";

export const rootReducer = {
        sourceElement: sourceSlice.reducer,
        targetElement: targetSlice.reducer,
        deviceElement: deviceSlice.reducer,
        routesElement: routesSlice.reducer,
        userElement: userSlice.reducer,
        repElement: repSlice.reducer,
        wsElemeent: wsSlice.reducer,
        messageElement: messageSlice.reducer,
        swiperElement: swiperSlice.reducer,
        imageElement: imageSlice.reducer,
        iconElement: iconSlice.reducer,
        cahceElement: cacheSlice.reducer
}

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck: false
        }),
})

export type AppDistpatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>