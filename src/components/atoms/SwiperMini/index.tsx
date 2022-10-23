import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'

export const SwiperMini = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 100 }}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide draggable={false} style={{  height: '100px', backgroundColor: '#fff',userSelect:'none' }}>Slide 1</SwiperSlide>
            <SwiperSlide draggable={false} style={{  height: '100px', backgroundColor: '#fff',userSelect:'none' }}>Slide 2</SwiperSlide>
            {/* <SwiperSlide style={{ width: '100px', height: '100px', backgroundColor: '#fff' }}>Slide 3</SwiperSlide>
            <SwiperSlide style={{ width: '100px', height: '100px', backgroundColor: '#fff' }}>Slide 4</SwiperSlide> */}
        </Swiper>
    )
}