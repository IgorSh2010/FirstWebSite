import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Plans from './Pages/Plans'
import Finished from './Pages/Finished'
import ProductDetails from './Pages/ProductDetails'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        {/* HEADER */}
        <header className="text-white px-6 py-6 shadow-md bg-cover bg-center"
                style={{ backgroundImage: "url('/flowers-rozi-buket-tsveti-rozovie-knigi.jpeg')" }}>
          <div className="bg-black/50 p-4 rounded flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/LORALEY.jpg"
                alt="logo"
                className="w-20 h-20 rounded-full bg-white p-1"
              />
              <h1 className="text-2xl font-bold font-montserrat tracking-wide">LS STUDIO</h1>
            </div>
            <nav className="space-x-4 hidden md:flex">
              <a href="/" className="hover:underline">Головна</a>
              <a href="/plans" className="hover:underline">Каталог товарів</a>
              <a href="/products" className="hover:underline">Товари</a>
              <a href="/about" className="hover:underline">Про нас</a>
            </nav>
          </div>
        </header>
        {/*<header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 tracking-wide">ФУНДАЦІЯ</h1>
          <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Головна</Link>
          <Link to="/plans" className="text-gray-600 hover:text-blue-600">Каталог товарів</Link>
          <Link to="/finished" className="text-gray-600 hover:text-blue-600">Проведена робота</Link>
            <a href="#" className="text-gray-600 hover:text-blue-600">Про нас</a>
          </nav>
        </header>

        {/*<div className="bg-red-500 text-white p-4">
          ТУТ МОЖЕ БУТИ ЯКАСЬ ЦІКАВА ІНФОРМАЦІЯ ЧИ, МОЖЛИВО, ЕКСТРЕНІ ПОВІДОМЛЕННЯ!
        </div>*/}

        {/*CONTENT SECTION*/}
        <div className="flex flex-1">
          {/* LEFT SIDEBAR */}
          <aside className="w-1/6 bg-gray-100 shadow-md p-4 hidden md:block border-r">
            <h2 className="text-lg font-semibold mb-2">Меню</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#">Профіль організації</a></li>
              <li><a href="#">Наші партнери</a></li>
              <li><a href="#">Завантаження</a></li>
            </ul>
          </aside>

        {/* Routing */}
        <main className="flex-1 p-6 bg-green-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/finished" element={<Finished />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>

        {/* RIGHT SIDEBAR */}
          <aside className="w-1/6 bg-gray-100 shadow-md p-4 hidden lg:block border-l">
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
        </div> 
      </Router>

      {/* FOOTER (опціонально) */}
      <footer className="bg-white p-4 text-center text-sm text-gray-400 border-t">
        &copy; {new Date().getFullYear()} ФУНДАЦІЯ. Всі права захищено.
      </footer>
    </div>
  )
}

export default App
