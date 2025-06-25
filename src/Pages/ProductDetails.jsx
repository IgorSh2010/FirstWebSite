import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs';
import OrderButton  from '../components/OrderButton';
import { Banknote, CircleCheckBig, X, BookOpenText } from 'lucide-react'; 

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  
  useEffect(() => {
    client.fetch(`*[_type == "product" && _id == $id][0]{
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url,
      category,
      available
    }`, { id }).then(setProduct).catch(console.error)
  }, [id])

  useEffect(() => {
    // Зберегти ID останнього переглянутого товару
    localStorage.setItem("lastViewedProductId", id);
    }, [id]);

  if (!product) return <div className="p-6">Loading...</div>

  return (
  <>
    <div className='ml-1'><Breadcrumbs /></div>
    <div className="md:ml-60 ml-1 bg-white/5 backdrop-blur-md p-4 max-w-3xl mx-auto">
      {product.imageUrl && (
        <a href={product.imageUrl} target="_blank" rel="noreferrer">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded mx-auto cursor-pointer"
          />
        </a>
      )}
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-3xl font-extrabold text-pink-700">{product.title}</h2>
        <FavoriteButton productId={id} product={product} />
      </div>
      <div className="flex items-center justify-between gap-4 mt-4">
        <p className="flex items-center gap-2 text-xl font-semibold"><Banknote size={32} color="green" />Cena: {product.price} zł. </p>
        <p className="flex items-center gap-2 font-semibold bg-white/5 backdrop-blur-md px-2 py-1 rounded">
          {product.available ? (
            <>
              <CircleCheckBig size={18} className='text-lime-800' />
              <span className='text-lime-800'>Dostępny</span>
            </>
          ) : (
            <>
              <X size={18} className='text-red-500' />
              <span className="text-red-500">Chwilowo nie dostępny (na zamówienie)</span>
            </>
          )}
        </p>
      </div>
      <p className="flex items-center gap-2 bg-white/5 backdrop-blur-md py-1 rounded font-semibold my-4">
        <BookOpenText size={32} color='blue'/>Opis: {product.description}
      </p>

      <OrderButton product={product} />
      
    </div>
  </>
  )
}
