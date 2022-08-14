import React, { useCallback, useEffect, useState } from "react";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, Dropdown, Form, Image } from "semantic-ui-react";
import { useCategory, useProduct } from "../../../../hooks";
import "./AddEditProductForm.scss";

export const AddEditProductForm = ({ onClose, onRefetch, product }) => {
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );
  const { categories, getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => getCategories(), []);
  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false, //valida cuando se envia el formulario
    onSubmit: async (formValue) => {
      if (product) await updateProduct(product.id, formValue);
      else await addProduct(formValue);

      onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del procuto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoría"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto activo
      </div>
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imágen" : "Subir Imágen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        type="submit"
        primary
        fluid
        content={product ? "Actualizar " : "Crear"}
      />
    </Form>
  );
};

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}
function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}
