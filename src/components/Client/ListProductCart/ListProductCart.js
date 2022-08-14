import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { cleanProductCartApi, removeProductCartApi } from "../../../api/cart";
import { useOrder, useTable } from "../../../hooks";
import "./ListProductCart.scss";

export const ListProductCart = ({ products, onReloadCart }) => {
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalTemp = 0;

    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });

    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;
    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }
    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);
  };
  return (
    <div className="list-products-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-products-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>$ {product.price}</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid onClick={createOrder}>
        Realizar Pedido ($ {total})
      </Button>
    </div>
  );
};
