import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import { useNavigate } from "react-router";
import ListControls from "../ListControls";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "category", numeric: false, disablePadding: true, label: "Category" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
  { id: "price", numeric: true, disablePadding: false, label: "Price (₴)" },
  { id: "void", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          "td, th": { color: "#726969", fontWeight: "bold", fontSize: "16px" },
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ProductsList({ onOpenModal }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const navigate = useNavigate();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(
    () => [...products].sort(getComparator(order, orderBy)),
    [order, orderBy, products]
  );

  return (
    <>
      <ListControls />
      <Box sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            className="products-list"
            sx={{ maxWidth: 900 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRows.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "td, th": {
                      color: index % 2 ? "#A58F8F" : "#FFF",
                      fontWeight: "bold",
                      fontSize: "16px",
                    },
                    backgroundColor: index % 2 ? "#3CD78C" : "#D9D9D9",
                    color: "red",
                  }}
                >
                  <TableCell align="right" component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {product.category}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <div>
                      <button
                        className="control-btn"
                        onClick={() =>
                          navigate(`/products/edit/update/${product.id}`)
                        }
                      >
                        <CreateIcon />
                      </button>
                      <button
                        className="control-btn"
                        onClick={() => onOpenModal(product.id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

// export default ProductsList;
