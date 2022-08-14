import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditUserForm,
  HeaderPage,
  TableUsers,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common/ModalBasic/ModalBasic";
import { useUser } from "../../hooks";

export const UserAdmin = () => {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, users, getUsers, deleteUser } = useUser();
  useEffect(() => getUsers(), [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo Usuarios");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar Usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Eliminar usuario ${data.email}?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}
      <ModalBasic
        show={showModal}
        title={titleModal}
        onClose={openCloseModal}
        children={contentModal}
      />
    </>
  );
};
