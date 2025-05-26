import { ref, get, set, update } from "firebase/database";
import { db } from "./config";

export const addToCart = async (uid, product) => {
  const cartItemRef = ref(db, `carritos/${uid}/${product.id}`);
  const snapshot = await get(cartItemRef);

  if (snapshot.exists()) {
    const current = snapshot.val();
    await update(cartItemRef, { cantidad: current.cantidad + 1 });
  } else {
    await set(cartItemRef, {
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      cantidad: 1,
    });
  }
};
