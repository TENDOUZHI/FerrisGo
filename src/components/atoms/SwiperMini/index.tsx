import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper'
import file from '@/assets/file.png'

interface Props {
    autoplay: boolean,
    autoplayDelay: number,
    pagination: boolean,
    scrollbar: boolean,
}

export const SwiperMini = (props: Props) => {
    return (
        <Swiper
            modules={[
                Navigation,
                props.pagination ? Pagination : Thumbs,
                props.scrollbar ? Scrollbar : Thumbs,
                props.autoplay ? Autoplay : Thumbs,
                Thumbs,
            ]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: props.autoplayDelay }}
            effect='slide'
            controller={{ inverse: true }}
            slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide style={{ height: '100px', backgroundColor: 'transparent', userSelect: 'none' }}>
                {/* Slide 1 */}
                <img src={file} style={{ width: '100%', height: '100px' }} alt="" />
            </SwiperSlide>
            <SwiperSlide style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 2</SwiperSlide>
            <SwiperSlide style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 3</SwiperSlide>
            <SwiperSlide style={{ height: '100px', backgroundColor: '#fff', userSelect: 'none' }}>Slide 4</SwiperSlide>
        </Swiper>
    )
}