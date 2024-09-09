// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import img1 from '../../static/myPhone/13.jpg'
import img2 from '../../static/myPhone/9.jpg'
import img3 from '../../static/myPhone/25.jpg'

function SwiperCom() {
    // loop 是否循环
    // initialSlide 初始化显示哪一个
    // delay 自动播放时间
    // pagination={{ clickable: true }} 原点导航
    return (
        <Swiper
            modules={[Pagination, Scrollbar, Autoplay]}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 10000 }}
            loop={true}
            initialSlide={4}
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: "100%", height: "100%" }}
        >
            <SwiperSlide>
                <img style={{ width: "100%" }} src={img1} />
            </SwiperSlide>
            <SwiperSlide>
                <img style={{ width: "100%" }} src={img2} />
            </SwiperSlide>
            <SwiperSlide>
                <img style={{ width: "100%" }} src={img3} />
            </SwiperSlide>
        </Swiper>
    )
}

export default SwiperCom