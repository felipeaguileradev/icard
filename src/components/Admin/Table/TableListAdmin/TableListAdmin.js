import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { TableAdmin } from "../Table";
import "./TableListAdmin.scss";
import { Button, Checkbox, Icon } from "semantic-ui-react";

export const TableListAdmin = ({ tables }) => {
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };

      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) setAutoReload(check);
    else window.location.reload();
  };

  return (
    <div className="tables-list-admin">
      <Button
        primary
        icon
        className="tables-list-admin__reload"
        onClick={onReload}
      >
        <Icon name="refresh" />
      </Button>
      <div className="tables-list-admin__reload-toggle">
        <span>Reload automático</span>
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
      </div>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
};
