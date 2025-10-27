import CartProducts from "@/components/cart/CartProducts";

export const metadata = {
  title: " جمعية الهدى | السلة ",
  description: " إدارة السلة ",
};



const Cart = () => {

  return (
    <div className="bg-gray-50 py-10">
        <CartProducts />
    </div>
  );
};

export default Cart;
