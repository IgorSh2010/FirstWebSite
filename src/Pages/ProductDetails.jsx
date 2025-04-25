import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'

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

  if (!product) return <div className="p-6">Завантаження...</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {product.imageUrl && (
        <a href={product.imageUrl} target="_blank" rel="noreferrer">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-[500px] object-contain rounded mb-4 mx-auto cursor-pointer"
          />
        </a>
      )}
      <h2 className="text-3xl font-bold text-blue-700">{product.title}</h2>
      <div className="flex items-center gap-4 mt-4">
        <p className="text-xl font-semibold">💰{product.price} грн</p>
        <p className="text-sm">{product.available ? '✅ В наявності' : '❌ Тимчасово відсутній'}</p>
      </div>
      <p className="text-gray-700 mt-2">{product.description}</p>
    </div>
  )
}
