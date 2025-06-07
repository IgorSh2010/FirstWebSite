import Breadcrumbs from '../components/Breadcrumbs'

function Regulamin() {
  return (
    <>
    <div className='ml-1 p-2 w-full'><Breadcrumbs /></div>
    <section className="ml-1 p-4 max-w-5xl mx-auto backdrop-blur-sm bg-pink-300/60 rounded-md">      
      <h1 className="text-2xl text-center font-semibold mb-4">
        REGULAMIN WITRYNY INTERNETOWEJ <strong>LS Studio</strong>.
      </h1>

      <div className="space-y-3">
        <p>
          <strong>§1. Informacje ogólne</strong>
        </p>
        <p className="ml-5"> 
          Witryna internetowa <strong>LS STUDIO</strong> prowadzona jest przez: Larysa Shepetko.
        </p>
        <p className="ml-5">
          <h1>Kontakt z administratorem:</h1>
          <p><strong>e-mail:</strong> likashepetko@gmail.com</p>
          <p><strong>tel.:</strong> +48 501 577 919</p>
        </p>
        <p>
          <strong>§2. Zamówienia</strong>
        </p>
        <p className="ml-5">
          <p>Zamówienia przez tą witrynę mogą być dokonywane <strong>tylko i wyłacznie</strong> przez osoby pełnoletnie.</p>
          <p>Wszystkie ceny produktów są wyrażone w złotych polskich.</p>
          <p>Zamówienia realizowane są zarówno wysyłką przez serwisy pocztowe (InPost, DPD, Poczta Polska) jak i z odbiorem osobistym w m. Mińsk Mazowiecki.</p>
        </p>
        <p>
          <strong>§3. Rejestracja i konto</strong>
        </p>
        <p className="ml-5">
          <p>Osoba pełnoletnia (klient) może założyć konto użytkownika, co umożliwia dostęp do historii zamówień i produktów ulubionych.</p>
          <p>Klient ma możliwość złożenia zamówienia za pośrednictwem witryny internetowej po uprzedniej rejestracji, korzystając z formularza zamówienia.</p>
          <p>Rejestracja wymaga podania adresu e-mail oraz hasła.</p>
          <p>Klient zobowiązuje się do podania prawdziwych danych.</p>          
        </p>
        <p>
          <strong>§4. Płatność i dostawa</strong>
        </p>
        <p className="ml-5">
          <p>Na chwilę obecną witryna nie umożliwia dokonywania płatności. Zamieszczone ceny mają charakter wyłącznie informacyjny i promocyjny, jednak odpowiadają rzeczywistej wartości oferowanych produktów.</p>
          <p>Osoba pełnoletnia (klient) odbiera zamówiony produkt osobiście lub przez serwisy pocztowe po ustaleniu szczegółów z właścicielem witryny.</p>
        </p>
        <p>
          <strong>§5. Reklamacje</strong>
        </p>
        <p className="ml-5">
          <p>W przypadku wad towaru klient ma prawo złożyć reklamację drogą mailową w ciągu 14 dni od daty go otzrymania.</p>
          <p>Reklamacje rozpatrywane są w terminie 14 dni od daty zgłoszenia.</p>
        </p>
        <p>
          <strong>§6. Zastrzeżenia</strong>
        </p>
        <p className="ml-5">
          <p>Witryna zastrzega sobie prawo do wprowadzania zmian w regulaminie.</p>
          <p>Korzystanie z witryny oznacza akceptację regulaminu.</p>
        </p>
      </div>

      <h1 className="text-2xl text-center font-semibold mb-4 mt-8">
        POLITYKA PRYWATNOŚCI WITRYNY INTERNETOWEJ <strong>LS Studio</strong>.
      </h1>
      <div>
        <p>
          <strong>§1. Administrator danych</strong>
        </p>
        <p className="ml-5">
          <p>Administratorem danych osobowych jest LS STUDIO – Larysa Shepetko, e-mail: likashepetko@gmail.com</p>
        </p>
        <p>
          <strong>§2. Zakres i cel przetwarzania</strong>
        </p>
        <p className="ml-5">
          <p>Dane osobowe (e-mail, imię, telefon, dane kontaktowe) przetwarzane są w celu:</p>
          <p className="ml-5">- realizacji zamówień,</p>
          <p className="ml-5">- kontaktu z klientem,</p> 
          <p className="ml-5">- obsługi konta użytkownika.</p>
          <p>Podanie danych jest dobrowolne, ale niezbędne do skorzystania z usług witryny.</p>
          <p>Dane osobowe Użytkownika nie są przekazywane przez Administratora podmiotom trzecim.</p>
        </p>
        <p>
          <strong>§3. Podstawy prawne przetwarzania</strong>
        </p>
        <p className="ml-5">
          <p>Przetwarzanie odbywa się zgodnie z RODO, w oparciu o:</p>
          <p className="ml-5">- art. 6 ust. 1 lit. b – realizacja umowy,</p>
          <p className="ml-5">- art. 6 ust. 1 lit. f – prawnie uzasadniony interes administratora.</p>
        </p>
        <p>
          <strong>§4. Prawa użytkownika</strong>
        </p>
        <p className="ml-5">
          <p>Każdy użytkownik ma prawo do:</p>
          <p className="ml-5">- dostępu do swoich danych,</p>
          <p className="ml-5">- ich sprostowania, usunięcia lub ograniczenia przetwarzania,</p>
          <p className="ml-5">- wniesienia sprzeciwu lub skargi do organu nadzorczego.</p>
        </p>
        <p>
          <strong>§5. Okres przechowywania danych</strong>
        </p>
        <p className="ml-5">
          <p>Dane przechowywane są przez okres niezbędny do realizacji celu, a także zgodnie z przepisami prawa.</p>
        </p>
        <p>
          <strong>§6. Cookies</strong>
        </p>
        <p className="ml-5">
          <p>Strona używa plików cookies w celach statystycznych i poprawy funkcjonalności.</p>
        </p>
      </div>  
    </section>
  </>  
  );
}

export default Regulamin;
