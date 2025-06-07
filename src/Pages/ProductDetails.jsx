import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  
  useEffect(() => {
    client.fetch(`*[_type == "product" && _id == $id][0]{
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
      <div className="flex items-center gap-4 mt-4">
        <p className="text-xl font-semibold">💰 Cena: {product.price} zł.</p>
        <p className="text-sm">{product.available ? '✅ Dostępny' : '❌ Chwilowo nie dostępny (na zamówienie)'}</p>
      </div>
      <p className="font-semibold mt-2">📌 Opis: {product.description}</p>
    </div>
  </>
  )
}
