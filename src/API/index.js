import axios from "axios";

export const hostedApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
const Api = {};
Api.signup = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  image
) =>
  await hostedApi.post("/api/signup", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    image,
  });

Api.login = async (email, password) =>
  await hostedApi.post("/api/login", {
    email,
    password,
  });

  Api.uploadProduct = async (name, category, image, price, description) => 
    await hostedApi.post("/product/upload-product", {
        name, category, image, price, description 
    });

    Api.getProducts = async () =>  await hostedApi.get("/product/get-products");
    Api.payment = async (productCartItem) => await hostedApi.post('/payment/create-checkout-session', productCartItem);

export default Api;
