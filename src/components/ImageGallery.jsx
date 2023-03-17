import { Swiper, SwiperSlide } from "swiper/react";
import imageUrlBuilder from "@sanity/image-url";
import "swiper/css/bundle";

import { Autoplay, Navigation } from "swiper";

const ImageGallery = ({ images }) => {
  const builder = imageUrlBuilder({
    projectId: process.env.projectId,
    dataset: "production",
  });

  function urlFor(source) {
    return builder.image(source);
  }

  let newImages = [];
  images.map((image) => newImages.push(image.asset._ref));

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={0}
      loop={true}
      autoplay={{
        delay: 3500,
      }}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className="gallerySwiper"
      style={{
        width: "640px",
        paddingLeft: "40px",
      }}
    >
      {newImages.map((img, idx) => {
        return (
          <SwiperSlide key={`${idx}`}>
            <img
              src={urlFor(img).width(600).height(600).fit("fillmax").url()}
              alt={idx}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageGallery;
