import Breadcrumbs from '../components/Breadcrumbs'
function About() {
  return (
    <>
    <div className='ml-1 p-2 w-full'><Breadcrumbs /></div>
    <section className="ml-1 p-4 max-w-3xl mx-auto backdrop-blur-sm bg-pink-300/60 rounded-md">      
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

        <a href="/regulamin" className="block hover:underline">Regulamin i Polityki prywatności</a>

      </div>
    </section>
  </>  
  );
}

export default About;
