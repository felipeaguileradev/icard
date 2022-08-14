import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ListProducts } from "../../components/Client/ListProducts/ListProducts";
import { useProduct } from "../../hooks";

export const Products = () => {
  const { tableNumber, idCategory } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(() => getProductsByCategory(idCategory), [idCategory]);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorías</Link>
      <p>Mesa: {tableNumber}</p>
      <p>Categoría: {idCategory}</p>

      {loading ? <p>Cargando...</p> : <ListProducts products={products} />}
    </div>
  );
};
