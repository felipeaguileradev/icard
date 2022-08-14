import React, { useEffect, useState } from "react";
import { useTable } from "../../hooks";
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { Loader } from "semantic-ui-react";

export const TablesAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, tables, getTables, deleteTable } = useTable();

  useEffect(() => getTables(), [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addTable = () => {
    setTitleModal("Crear mesa");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal("Actualizar mesa");
    setContentModal(
      <AddEditTableForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        table={data}
      />
    );
    openCloseModal();
  };

  const onDeleteTable = async (data) => {
    const result = window.confirm(`¿Eliminar mesa ${data.number}`);
    if (result) {
      await deleteTable(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeaderPage
        title="Mesas"
        btnTitle="Crear nueva mesa"
        btnClick={addTable}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={onDeleteTable}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        children={contentModal}
        onClose={openCloseModal}
      />
    </>
  );
};
