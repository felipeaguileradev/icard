import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { Button } from "semantic-ui-react";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";

export const Cart = () => {
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();
  const [reloadCart, setReloadCart] = useState(false);
  const [products, setProducts] = useState(null);

  console.log(size(products));
  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productArray = [];

      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productArray.push(response);
      }
      setProducts(productArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) < 1 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito está vacío</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedido</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
};
