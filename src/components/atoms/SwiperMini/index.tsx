import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper'
import file from '@/assets/file.png'

export const SwiperMini = () => {
    return (
        <Swiper
            modules={[
                Navigation,
                Pagination,
                Scrollbar,
                Autoplay,
                Thumbs,
            ]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2000 }}
            effect='slide'
            controller={{ inverse: true }}
            slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide draggable={false} style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>
                {/* Slide 1 */}
                <img src={file} style={{width:'100%',height:'100px'}} alt="" />
            </SwiperSlide>
            <SwiperSlide draggable={false} style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 2</SwiperSlide>
            <SwiperSlide draggable={false} style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 3</SwiperSlide>
            <SwiperSlide draggable={false} style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 4</SwiperSlide>
        </Swiper>
    )
}