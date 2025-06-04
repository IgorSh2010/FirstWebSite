import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'

export default function Favorites() {
    const user = auth.currentUser;
    const [favorites, setFavorites] = useState([]);

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
        {favorites.length > 0 && (
        <div>
            <h2 className="text-xl font-semibold mt-6">Ulubione produkty:</h2>
            <ul className="space-y-2">
            {favorites.map(fav => (
                <li key={fav.id} className="border p-2 rounded bg-pink-50">
                <strong>{fav.title}</strong> – {fav.price} zł
                </li>
            ))}
            </ul>
        </div>
        )}
    </>
    )
}