import React from "react";
import { Button, Icon, Image, Table } from "semantic-ui-react";
import { map } from "lodash";
import "./TableCategoryAdmin.scss";

export const TableCategoryAdmin = ({
  categories,
  updateCategory,
  deleteCategory,
}) => {
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoría</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={category.image} />{" "}
            </Table.Cell>
            <Table.Cell width={2}>{category.title}</Table.Cell>
            <Actions
              category={category}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function Actions({ category, updateCategory, deleteCategory }) {
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
