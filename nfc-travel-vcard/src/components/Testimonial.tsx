import React from 'react';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

interface ITestimonial {
  source: string;
  name: string;
  text: string;
  rating: number;
}

interface TestimonialProps {
  testimonials: ITestimonial[];
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <div className="bg-white shadow-2xl z-50 py-6 px-4 md:px-12">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={2}
        // navigation
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
    
      >
        {testimonials.map((t: ITestimonial, idx: number) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
              <div className="w-full md:w-1/5 text-center md:text-left">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-gray-500">{t.source}</p>
              </div>
              <div className="w-full md:w-3/5 text-sm italic text-center md:text-left text-gray-700">
                {t.text}
              </div>
              <div className="w-full md:w-1/5 text-center md:text-right">
                <p className="font-semibold text-sm">{t.rating}/5</p>
                <div className="text-yellow-400">
                  {"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div >
  );
};

export default Testimonial;
