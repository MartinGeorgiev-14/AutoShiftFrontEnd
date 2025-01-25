import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle'
import 'swiper/css/free-mode';
import '../../../styles/swiper.css'
import { useState } from "react";

const Container = styled.div`
   width: 60%;
   height: 100%;
`
const Img = styled.img`
`

const ImageSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return(
        <Container>
            <Swiper loop={true} spaceBetween={10} navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2">
            {
                images.map((img, index) => {
                    return (
                    <SwiperSlide key={index}>
                        <Img src={`data:${img.type};base64,${img.imageData}`}/>
                    </SwiperSlide>
                    )
                })
            }
            </Swiper>
        </Container>
    )

}

export default ImageSlider