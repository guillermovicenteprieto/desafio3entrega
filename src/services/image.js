import generateRandomProduct from "../class/fakerContainer.js";
import randomNumbers from "../utils/randomApi.js";
const listProducts = generateRandomProduct();

const images = listProducts.map((producto) => {
  return {
    url: producto.url,
    image: producto.url,
  };
});

export default images;
