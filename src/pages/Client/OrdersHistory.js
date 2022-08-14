import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { forEach, map, size } from "lodash";
import { useOrder, useTable, usePayment } from "../../hooks";
import { OrderHistoryItem } from "../../components/Client/OrderHistoryItem/OrderHistoryItem";
import { ModalConfirm } from "../../components/Common";

export const OrdersHistory = () => {
  const { tableNumber } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idTable, setIdTable] = useState(null);
  const [isRequestAccount, setIsRequestAccount] = useState(false);

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;

    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };

    const payment = await createPayment(paymentData);

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }

    window.location.reload();
  };

  return (
    <div>
      <h2>Historial de pedidos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya está pedida"
                : "Pedir la cuenta"}
            </Button>
          )}

          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}

      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("CARD")}
      />
    </div>
  );
};
