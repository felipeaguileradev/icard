import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { useOrder } from "../../../../hooks/useOrder";
import "./PaymentProductList.scss";
export const PaymentProductList = ({ payment }) => {
  const { getOrdersByPayment } = useOrder();
  const [orders, setOrders] = useState([]);
  console.log(
    "🚀 ~ file: PaymentProductList.js ~ line 9 ~ PaymentProductList ~ orders",
    orders
  );

  useEffect(() => {
    (async () => {
      const response = await getOrdersByPayment(payment.id);
      setOrders(response);
    })();
  }, []);

  return (
    <div className="payment-product-list">
      {map(orders, (order) => (
        <div className="payment-product-list__product" key={order.id}>
          <div>
            <Image src={order.product_data.image} avatar size="tiny" />
            <span>{order.product_data.title}</span>
          </div>
          <span>$ {order.product_data.price}</span>
        </div>
      ))}
    </div>
  );
};
