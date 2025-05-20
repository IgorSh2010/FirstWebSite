import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ products, title = '', showButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 w-full max-w-full lg:max-w-screen-lg mx-auto">
      {title && <h2 className="text-3xl font-extrabold mb-4 text-green-800">{title}</h2>}
      
      <div className="w-full mx-auto overflow-hidden relative px-2">
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
        className="pb-20"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="relative z-0 bg-white/70 backdrop-blur-md p-3 rounded-md shadow hover:shadow-md transition text-sm sm:max-w-xs w-full mx-auto">
              <div className="overflow-hidden rounded">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-32 object-contain rounded mb-2 mx-auto transition-transform duration-300 transform hover:scale-150"
                />
              </div>
              <h3 className="text-sm font-semibold text-pink-700 mb-1">{product.title}</h3>
              <p className="text-xs text-gray-600 mb-1 line-clamp-2">{product.description}</p>
              <p className="text-sm font-bold text-pink-600">{product.price} zł.</p>
              {showButton && (
                <button
                  onClick={() => navigate(`/productsMain/${product._id}`)}
                  className="mt-2 w-full text-center px-3 py-1 bg-pink-500 text-white rounded text-xs hover:bg-pink-600 flex flex-col justify-between"
                >
                  Szczegóły
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
