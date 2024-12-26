import React from "react";
import { useSelector } from "react-redux";
import emptyCartImage from "../assest/emptyCartImage.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import Api from "../API";

export default function Cart() {
  const productCartItem = useSelector((state) => state.product.cartItem);
  //   console.log("productCartItem:", productCartItem);
  const user = useSelector((state) => state.user);
  //   console.log("user:", user);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    try {
      const stripePublicKey =
        "pk_test_51PtAIH04KMpMkoEQMOv3JIwdYvxpL3gFY4R3Jxhdfpa88LLFjmYuSvf9gJ4zWM20QHjr5X3gAowhYQcu1NN0YlYA002YYAALSQ";
      console.log("stripePublicKey:", stripePublicKey);

      const stripePromise = loadStripe(stripePublicKey);

      const res = await Api.payment(productCartItem);
      console.log("res:", res);

      if (res.status === 500) return;

      const dataRes = await res.data;
      console.log("dataRes:", dataRes);
      toast("Redirected to Payment Gateway...!");

      const stripe = await stripePromise;
      stripe.redirectToCheckout({ sessionId: dataRes });
    } catch (error) {
      console.error("Error handling payment:", error);
      toast("An error occurred during payment.");
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* Display Cart Items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    image={el.image}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>
            {/* Total Cart Items  */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white hover:bg-red-600"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
