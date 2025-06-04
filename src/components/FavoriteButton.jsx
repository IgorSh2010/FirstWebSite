import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc, } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const FavoriteButton = ({ productId, product }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(null);

  const favRef = user && doc(db, "users", user.uid, "favorites", productId);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    return () => unsubscribe();
    }, []);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !favRef) return;
      const docSnap = await getDoc(favRef);
      setLiked(docSnap.exists());
    };
    checkFavorite();
  }, [user, favRef]);

  const handleLike = async () => {
    if (!user) {
      setModalMessage("Najperw musisz się zalogować!");
      return;
    }

    if (liked) {
      await deleteDoc(favRef);
    } else {
      await setDoc(favRef, {
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
      });    
      
      setLiked(!liked);
    }    
  };

  return (
    <>
    <button
      onClick = {handleLike}
      className="top-2 right-2 text-xl z-10"
      title="Dodaj do ulubionych"
    >
      {liked ? "❤️" : "🤍"}
    </button>

    {modalMessage && (
       <> 
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);        
          navigate("/login");        
      }} />
      </>
    )}
    </>
  );
};

export default FavoriteButton;