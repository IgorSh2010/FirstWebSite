import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/HeaderNew'
import Home from './Pages/Home'
import Products from './Pages/ProductsMain'
import AboutUs from './Pages/About'
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'
import Regulamin from './Pages/RegulaminPolityki'
import Favorites from './Pages/Favorites'
import CookieConsent from './components/CookieConsent';
import Orders from './components/Orders';

const Layout = () => {
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

      {/* Routing */}
      <main className="md:pt-16 flex-1 p-4 pt-32 bg-fixed w-full" style={{ backgroundImage: "url('/vyazanie-kryuchkom-8.jpg')" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productsMain" element={<Products />} />
          <Route path="/productsMain/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
          {/* Додайте інші маршрути за потребою */}
        </Routes>
      </main>

      {/* RIGHT SIDEBAR 
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
      )}*/}
      </div> 
    </div>
  )}

function App() {
  return (
      <Router>
        <Layout />
        <CookieConsent />

        {/* FOOTER (опціонально) */}
        <footer className="bg-white p-4 text-center text-sm text-gray-400 border-t">
          &copy; {new Date().getFullYear()} LS STUDIO. Wszelkie prawa zastrzeżone.
        </footer>
      </Router>
  )
}

export default App
