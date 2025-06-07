import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/free-mode';
import '../../../styles/swiper.css'
import { useState } from "react";

const ImageSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className="lg:h-fit">
            <Swiper loop={true} spaceBetween={10} navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 lg:max-w-[45rem]">
                {
                    images.map((img, index) => {
                        return (
                            <SwiperSlide className="" key={index}>
                                <img className="rounded-xl object-contain w-full mx-auto shadow-2xl" src={img.url} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )

}

export default ImageSlider