import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = ({ products, title = '', showButton = false, onDetailsClick }) => {
  return (
    <div className="mb-6 w-full">
      {title && <h2 className="text-xl font-extrabold mb-4 text-green-600">{title}</h2>}
      
      <div className="w-full max-w-screen-xl mx-auto overflow-hidden">
      {products?.length > 0 && (  
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white/70 backdrop-blur-md p-3 rounded-md shadow hover:shadow-md transition text-sm max-w-xs w-full mx-auto">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold text-pink-700 mb-1">{product.title}</h3>
              <p className="text-xs text-gray-600 mb-1 line-clamp-2">{product.description}</p>
              <p className="text-sm font-bold text-pink-600">{product.price} zł.</p>
              {showButton && (
                <button
                  onClick={() => onDetailsClick?.(product)}
                  className="mt-2 px-3 py-1 bg-pink-500 text-white rounded text-xs hover:bg-pink-600"
                >
                  Szcególnie
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )}
      </div>
    </div>
  );
};

export default Carousel;
