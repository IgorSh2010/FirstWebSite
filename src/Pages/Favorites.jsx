import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs'

export default function Favorites() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [hiddenCard, setHiddenCard] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
        }, []);

    useEffect(() => {
    const fetchFavorites = async () => {
        if (!user) return;
        const favsRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(favsRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(items);
    };

    fetchFavorites();
    }, [user]);

    return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    {favorites.length > 0 && (
    <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-6">Ulubione produkty:</h2>    
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 bg-white/5 backdrop-blur-md">
        {favorites.map(fav => (
          <Link to={`/productsMain/${fav.id}`} key={fav.id}
                    className={`relative transition-all duration-500 ease-in-out 
                        ${hiddenCard === fav.id ? 'opacity-0 scale-95' : 'opacity-100'}`}>  
            <div className="bg-red-200 border p-4 rounded shadow hover:shadow-md transition max-w-xs w-full mx-auto">
            <FavoriteButton productId={fav.id}
                            product={fav}
                            onUnliked={() => {
                            setHiddenCard(fav.id); // start animation
                            setTimeout(() => {
                                setFavorites(favs => favs.filter(item => item.id !== fav.id));
                                setTimeout(() => setHiddenCard(null));
                            }, 400); // match with duration
                            }} />          
            {fav.imageUrl && (
                <img
                src={fav.imageUrl}
                alt={fav.title}
                className="w-full h-32 object-contain mb-2 rounded"
                />
            )}
            
            <div className="border p-2 rounded bg-pink-50 text-sm"> 
                <p><strong>{fav.title}</strong></p>
                <p>{fav.price} zł</p>
            </div>            
            </div>
          </Link>  
        ))}
        </div>
    </div>
    )}
    </>
    )
}