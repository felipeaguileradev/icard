import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useTable } from "../../../hooks";
import "./SelectTable.scss";

export const SelectTable = () => {
  const navigate = useNavigate();
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No has introducido una mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) navigate(`/client/${tableNum}`);
      else setError("El número de la mesa no existe");
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a iCard</h1>
        <h2>Introduce tu número de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 135, 873, 904"
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Entrar
          </Button>
        </Form>

        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
};
