import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";

import { Button, Form } from "semantic-ui-react";
import "./AddEditTableForm.scss";

export const AddEditTableForm = ({ onClose, table, onRefetch }) => {
  const { addTable, updateTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false, // solo validara cuando envia el formulario y no en cada cambio
    onSubmit: async (formValue) => {
      try {
        if (!!table) {
          await updateTable(table.id, formValue);
        } else await addTable(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="Número de la mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />

      <Button
        type="submit"
        content={!!table ? "Actualizar" : "Crear"}
        primary
        fluid
      />
    </Form>
  );
};

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().required(true),
  };
}
