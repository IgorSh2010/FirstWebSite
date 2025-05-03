import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './Pages/Home'
import Products from './Pages/ProductsMain'
import Finished from './Pages/Finished'
import ProductDetails from './Pages/ProductDetails'

const Layout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">    
      {/* HEADER */}
      <header> <Header /> </header>
      
      {/*NEWS SECTION*/}
      {/*<div className="bg-red-500 text-white p-4">
        ТУТ МОЖЕ БУТИ ЯКАСЬ ЦІКАВА ІНФОРМАЦІЯ ЧИ, МОЖЛИВО, ЕКСТРЕНІ ПОВІДОМЛЕННЯ!
      </div>*/}

      {/*CONTENT SECTION*/}
      <div className="flex flex-1">

      {/* LEFT SIDEBAR */}
      {!isHome && (        
        <aside className="w-1/6 pt-16 bg-pink-200 shadow-md p-4 hidden md:block border-r font-serif font-bold bg-left bg-cover"
                style={{ backgroundImage: "url('/flowers-rozi-buket-tsveti-rozovie-knigi.jpeg')" }}
                >
          <h2 className="text-lg font-montserrat mb-2">Katalog</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:underline">Lalki</a></li>
            <li><a href="#" className="hover:underline">Bohaterowie bajkowe</a></li>
            <li><a href="#" className="hover:underline">Maskotki</a></li>
            <li><a href="#" className="hover:underline">Breloki</a></li>
            <li><a href="#" className="hover:underline">Biżuteria</a></li>
            <li><a href="#" className="hover:underline">Kwiaty</a></li>
          </ul>
        </aside>
      )}

      {/* Routing */}
      <main className="flex-1 p-6 pt-16" style={{ backgroundImage: "url('/knitting-4228338_1920.jpg')" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productsMain" element={<Products />} />
          <Route path="/finished" element={<Finished />} />
          <Route path="/productsMain/:id" element={<ProductDetails />} />
        </Routes>
      </main>

       {/* RIGHT SIDEBAR */}
      {!isHome && (     
        <aside className="w-1/6 pt-16 bg-pink-200 shadow-md p-4 hidden lg:block border-l bg-bottom bg-cover"
                style={{ backgroundImage: "url('/flowers-rozi-buket-tsveti-rozovie-knigi.jpeg')" }}>
          <h2 className="text-lg font-semibold mb-2">Контакти</h2>
          <p className="text-sm text-gray-700">📧 fund@example.org</p>
          <p className="text-sm text-gray-700">📞 +38 (097) 123-45-67</p>

          <div className="mt-4">
            <h3 className="text-sm font-semibold">Поділитись</h3>
            <div className="flex space-x-2 mt-1">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Facebook</button>
              <button className="bg-blue-400 text-white px-2 py-1 rounded text-xs hover:bg-blue-500">Telegram</button>
            </div>
          </div>
        </aside>
      )}
      </div> 
    </div>
  )}

function App() {
  return (
      <Router>
        <Layout />

        {/* FOOTER (опціонально) */}
        <footer className="bg-white p-4 text-center text-sm text-gray-400 border-t">
          &copy; {new Date().getFullYear()} LS STUDIO. Всі права захищено.
        </footer>
      </Router>
  )
}

export default App
