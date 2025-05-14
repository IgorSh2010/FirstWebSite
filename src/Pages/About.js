import Breadcrumbs from '../components/Breadcrumbs'
function About() {
  return (
    <section className="p-4 max-w-3xl mx-auto backdrop-blur-sm bg-pink-300/60 rounded-md">
      <Breadcrumbs />
      <h1 className="text-2xl font-semibold mb-4">
        Witajcie w <strong>LS Studio</strong>! ✨
      </h1>

      <div className="space-y-3">
        <p>
          Mam na imię <strong>Larysa Shepetko</strong> i z ogromną radością witam Was na stronie mojej pracowni rękodzieła.
        </p>
        <p>
          <strong>LS Studio</strong> to miejsce stworzone z pasji do tworzenia pięknych, unikalnych rzeczy. Każdy przedmiot powstaje z dbałością o szczegóły, sercem i z myślą o tych, którzy cenią ręczną pracę i wyjątkowy styl.
        </p>
        <p>
          Z dumą prezentuję Wam nasze produkty – od dekoracji wnętrz, przez akcesoria, po ręcznie robione prezenty.
        </p>
        <p>
          Dziękuję, że jesteście z nami. Mam nadzieję, że znajdziecie tu coś, co Was zachwyci i zostanie z Wami na dłużej.
        </p>
        <p>Z serdecznymi pozdrowieniami,</p>
        <p><strong>Larysa Shepetko</strong></p>
        <p><em>LS Studio</em></p>

        {/* WhatsApp Button */}
        <button
          onClick={() => window.open('https://wa.me/48501577919', '_blank')}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Napisz na WhatsApp!!!
        </button>

        {/* Contact Email */}
        <p className="text-sm text-gray-700 mt-4">📧 likashepetko@gmail.com</p>

        {/* Social Media Links */}
        <div className="mt-6 flex items-center space-x-4">
          <a
            href="https://www.facebook.com/larysa.shepetko"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>🌐</span>
            <span>Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/shepetko.larisa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline flex items-center space-x-1"
          >
            <span>📷</span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
