import React from "react";
import moment from "moment";
import { Button, Image } from "semantic-ui-react";
import classNames from "classnames";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../../utils/constans";
import "./OrderItemAdmin.scss";
import { useOrder } from "../../../../hooks/useOrder";

export const OrderItemAdmin = ({ order, onReloadOrders }) => {
  const { title, image } = order.product_data;
  const { checkDeliverdOrder } = useOrder();

  const onCheckDeliverdOrder = async () => {
    await checkDeliverdOrder(order.id);
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("HH:mm")}</span>
        {" - "}
        <span>{moment(order.created_at).startOf("secods").fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={onCheckDeliverdOrder}>
          Marcar entragado
        </Button>
      )}
    </div>
  );
};
