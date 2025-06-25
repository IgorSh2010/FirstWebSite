import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc, } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const FavoriteButton = ({ productId, product, onUnliked }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
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
      setConfirmDelete(true);
    } else {
      await setDoc(favRef, {
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
      })
      setLiked(true); 
    }
    
    setLiked((prev) => !prev);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  const handleDeleteConfirmed = async () => {
  await deleteDoc(favRef);
  setLiked(false);
  setConfirmDelete(false);
  setModalMessage("Produkt usunięty z ulubionych");
  if (onUnliked) onUnliked();
};

  const ttl = liked ? "Usuń z ulubionych" : "Dodaj do ulubionych";

  return (
    <>
    <button
      onClick = {(e) => {
        e.stopPropagation(); // ⛔ Зупиняє перехід
        e.preventDefault();  // ⛔ Зупиняє <Link>
        handleLike();
      }}
      className = {'w-10 h-8 flex-shrink-0 ml-auto'}
      title = {ttl}
    >
      <img
        src = {liked ? '/favorite.png' : '/unfavorite.png'}
        alt="Ulubiony"
        className = {`w-10 h-8 flex-shrink-0 transition-transform ${animate ? "scale-125" : "scale-100"} duration-300`}
        style={{ flexShrink: 0 }}
      />
    </button>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);        
          navigate("/login");        
      }} />
    )}

    {confirmDelete && (
      <Modal
        message="Czy na pewno chcesz usunąć produkt z Ulubionych?"
        confirmMode
        onClose={() => setConfirmDelete(false)}      // НІ
        onConfirm={handleDeleteConfirmed}        // ТАК
      />
    )}
    </>
  );
};

export default FavoriteButton;