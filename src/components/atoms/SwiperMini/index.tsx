import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper'
import { SwiperItem } from '@/store/swiper.slice';

interface Props {
    autoplay: boolean,
    autoplayDelay: string,
    pagination: boolean,
    scrollbar: boolean,
    items: Array<SwiperItem>,
    garbage: number
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
            autoplay={{ delay: parseInt(props.autoplayDelay) }}
            effect='slide'
            controller={{ inverse: true }}
            slidesPerView={1}
            style={{ height: '100%' }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
            {props.items.map(item => item.status &&
                <SwiperSlide
                    style={{
                        height: '100%',
                        backgroundColor: 'transparent',
                        userSelect: 'none',
                    }}
                    key={item.id}>
                    {/* {item.content} */}
                    <img style={{ width: '100%', height: '100%' }} src={item.content} alt="" />
                </SwiperSlide>)}

        </Swiper>
    )
}