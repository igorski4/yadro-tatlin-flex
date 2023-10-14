import { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Product } from "../../models/Product";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalEditProduct from "./ModalEditProduct";
import { getFullDate } from "../utils/date";
import { Hidden, List, ListItem, Typography } from "@mui/material";

interface Column {
  id: "id" | "name" | "weight" | "order_date" | "availability" | "customer" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 20, align: "center" },
  { id: "name", label: "Product name", minWidth: 200, align: "left" },
  {
    id: "weight",
    label: "Weight",
    minWidth: 80,
    align: "center",
  },
  {
    id: "order_date",
    label: "Order date",
    minWidth: 80,
    align: "center",
    format: (value: string) => getFullDate(value),
  },
  {
    id: "availability",
    label: "Stock availability",
    minWidth: 80,
    align: "center",
  },
  {
    id: "customer",
    label: "Customer",
    minWidth: 200,
    align: "left",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 150,
    align: "right",
  },
];

const columnsMobile: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 10, align: "center" },
  { id: "name", label: "Product name", minWidth: 180, align: "left" },
  {
    id: "actions",
    label: "Actions",
    minWidth: 40,
    align: "right",
  },
];

type ProductsTableProps = {
  data?: Product[];
};

const ProductsTable: FC<ProductsTableProps> = ({ data }) => {
  const [openModalDelete, setOpenModalDelete] = useState<{ state: boolean; product?: Product }>({
    state: false,
  });

  const [openModalChange, setOpenModalChange] = useState<{ state: boolean; product?: Product }>({
    state: false,
  });

  const handleOpenDeleteModal = (el: Product) => setOpenModalDelete({ state: true, product: el });
  const handleCloseDeleteModal = () => setOpenModalDelete({ state: false });

  const handleOpenChangeModal = (el: Product) => {
    setOpenModalChange({ state: true, product: el });
  };
  const handleCloseChangeModal = () => setOpenModalChange({ state: false });

  return (
    <>
      <ModalDeleteProduct
        open={openModalDelete.state}
        product={openModalDelete?.product}
        handleClose={handleCloseDeleteModal}
      />
      <ModalEditProduct
        open={openModalChange.state}
        product={openModalChange?.product}
        handleClose={handleCloseChangeModal}
      />
      <Paper sx={{ width: "100%", overflow: "hidden", flexGrow: 1 }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <Hidden mdDown>
              <TableHead sx={{ bgcolor: "#f3e5f5" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((el) => {
                  return (
                    <TableRow tabIndex={-1} key={el.id}>
                      {columns.map((column, i) => {
                        if (column.id === "actions")
                          return (
                            <TableCell key={column.id} align={"right"}>
                              <Button onClick={() => handleOpenDeleteModal(el)}>delete</Button>
                              <Button onClick={() => handleOpenChangeModal(el)}>change</Button>
                            </TableCell>
                          );
                        const value = el[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value.toString()) : value.toString()}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Hidden>
            <Hidden mdUp>
              <TableHead>
                <TableRow>
                  {columnsMobile.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((el) => {
                  return (
                    <TableRow tabIndex={-1} key={el.id}>
                      {columnsMobile.map((column, i) => {
                        if (column.id === "actions")
                          return (
                            <TableCell key={column.id} align={"right"} sx={{ py: 3, px: 0.5, verticalAlign: "top" }}>
                              <Button onClick={() => handleOpenDeleteModal(el)} sx={{ px: 0 }}>
                                delete
                              </Button>
                              <Button onClick={() => handleOpenChangeModal(el)} sx={{ px: 0 }}>
                                change
                              </Button>
                            </TableCell>
                          );

                        if (column.id === "id")
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ py: 3.5, px: 0.5, verticalAlign: "top" }}
                            >
                              {el[column.id].toString()}
                            </TableCell>
                          );

                        const entriesEl = Object.entries(el).filter((el) => el[0] !== "id");

                        return (
                          <TableCell align={"left"} sx={{ py: 3, px: 0.5 }}>
                            <List sx={{ p: 0 }}>
                              {entriesEl.map((el) => (
                                <ListItem sx={{ wordWrap: "break-word", px: 0, py: 0.5 }}>
                                  <Typography sx={{ fontWeight: "bold" }}>
                                    {el[0][0].toUpperCase() + el[0].slice(1)}
                                    {":"}&nbsp;
                                  </Typography>
                                  <Typography component="span">
                                    {el[0] === "order_date" ? getFullDate(el[1].toString()) : el[1].toString()}
                                  </Typography>
                                </ListItem>
                              ))}
                            </List>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Hidden>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ProductsTable;
