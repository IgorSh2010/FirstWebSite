import Products from '../components/Products'

export default function ProductsMain() {
  return (
    <div className="bg-white/5 backdrop-blur-md shadow-md p-6"> 
      <h2 className="text-3xl font-bold text-pink-500 mb-4">Wszystkie wyroby</h2>
      <Products />
    </div>
  )
}
