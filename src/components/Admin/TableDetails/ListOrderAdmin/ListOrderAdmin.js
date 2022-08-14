import { map } from "lodash";
import React from "react";
import { OrderItemAdmin } from "../OrderItemAdmin";
import "./ListOrderAdmin.scss";

export const ListOrderAdmin = ({ orders, onReloadOrders }) => {
  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
};
