import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs';
//import OrderButton  from '../components/OrderButton';
import { Banknote, CircleCheckBig, X, BookOpenText } from 'lucide-react'; 
import ToCartButton from '../components/ToCartButton';

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
    <div className="md:ml-60 ml-1 bg-white/5 backdrop-blur-md p-4 max-w-4xl mx-auto">
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
  
        {/* Cena */}
        <p className="flex items-center gap-2 text-xl font-semibold">
          <span className="flex-shrink-0">
            <Banknote size={24} className="text-green-700" />
          </span>
          <span>Cena: {product.price} zł</span>
        </p>

        {/* Dostępność */}
        <p className="flex items-center gap-2 font-semibold bg-white/5 backdrop-blur-md px-2 py-1 rounded">
          {product.available ? (
            <>
              <span className="flex-shrink-0">
                <CircleCheckBig size={20} className="text-lime-800" />
              </span>
              <span className="text-lime-800">Dostępny</span>
            </>
          ) : (
            <>
              <span className="flex-shrink-0">
                <X size={20} className="text-red-500" />
              </span>
              <span className="text-red-500">Chwilowo nie dostępny (na zamówienie)</span>
            </>
          )}
        </p>
      </div>
      {/* Opis */}
      <p className="flex items-start gap-2 bg-white/5 backdrop-blur-md py-1 rounded font-semibold my-4">
        <span className="flex-shrink-0 pt-1">
          <BookOpenText size={25} className="text-blue-700" />
        </span>
        <span className="text-sm">{product.description}</span>
      </p>

      {/* <OrderButton product={product} /> */}
      <ToCartButton product={product} />
    </div>
  </>
  )
}
