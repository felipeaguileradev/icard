import React, { useState, useCallback } from "react";
import { Button, Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";
import "./AddEditCategoryForm.scss";

export const AddEditCategoryForm = ({ onClose, onRefetch, category }) => {
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(!!category ? updateSchema() : newSchema()),
    validateOnChange: false, // solo validara cuando envia el formulario y no en cada cambio
    onSubmit: async (formValue) => {
      try {
        if (!!category) {
          await updateCategory(category.id, formValue);
        } else await addCategory(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
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
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la categoría"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Button
        type="button"
        fluid
        color={formik.errors.image && "red"}
        {...getRootProps()}
      >
        {!!previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} fluid />

      <Button
        type="submit"
        content={!!category ? "Actualizar" : "Crear"}
        primary
        fluid
      />
    </Form>
  );
};

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}
function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
