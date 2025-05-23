import { useEffect, useState } from 'react'
import { client } from '../sanityClient'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        title,
        description,
        price,
        "imageUrl": image.asset->url,
        category,
        available
      }`)
      .then((data) => {
              console.log('Fetched products:', data)
              setProducts(data)
            })
      .catch(console.error)
  }, [])

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link to={`/productsMain/${product._id}`} key={product._id}>
          <div key={product._id} className="bg-red-200 border p-4 rounded shadow hover:shadow-md transition">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-contain mb-2 rounded" />
            )}
            <h3 className="text-lg font-semibold text-pink-800">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">💰 Cena: {product.price} zł.</p>
            <p className="text-xs mt-1">{product.available ? '✅ Dostępny' : '❌ Chwilowo nie dostępny (na zamówienie)'}</p>
          </div>      
        </Link>))}
    </div>
  )
}
