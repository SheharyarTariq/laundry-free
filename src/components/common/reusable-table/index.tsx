import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import EastIcon from "@mui/icons-material/East";
import { visuallyHidden } from "@mui/utils";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface TableColumn<T> {
  id: keyof T;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface EnhancedTableHeadProps<T> {
  columns: TableColumn<T>[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => void;
  order: Order;
  orderBy: keyof T | "";
  rowCount: number;
  showCheckbox?: boolean;
}

function EnhancedTableHead<T>({
  columns,
  order,
  orderBy,
  onRequestSort,
  showCheckbox = true,
}: EnhancedTableHeadProps<T>) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        "& .MuiTableCell-head": {
          backgroundColor: "#F9FAFB",
          color: "#667085",
        },
      }}
    >
      <TableRow>
        {showCheckbox && <TableCell padding="checkbox"></TableCell>}
        {columns.map((column) => (
          <TableCell
            key={String(column.id)}
            align={column.align || (column.numeric ? "right" : "left")}
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.id ? order : false}
          >
            {column.sortable === false ? (
              column.label
            ) : (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export interface ReusableTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  showCheckbox?: boolean;
  defaultOrderBy?: keyof T;
  defaultOrder?: Order;
  pagination?: boolean;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
}

export default function ReusableTable<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  showCheckbox = true,
  defaultOrderBy,
  defaultOrder = "asc",
  pagination = true,
  initialRowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 25],
}: ReusableTableProps<T>) {
  const [order, setOrder] = React.useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = React.useState<keyof T | "">(
    defaultOrderBy || ""
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = React.useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage, pagination]);

  const emptyRows = pagination
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0
    : 0;

  const renderCellContent = (column: TableColumn<T>, row: T) => {
    const value = row[column.id];

    if (column.render) {
      return column.render(value, row);
    }

    if (column.id === "action") {
      return <EastIcon sx={{ color: "#646464" }} />;
    }

    return value as React.ReactNode;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              showCheckbox={showCheckbox}
            />
            <TableBody>
              {paginatedData.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={(row as { id?: string | number }).id ?? index}
                    sx={{ cursor: onRowClick ? "pointer" : "default" }}
                    onClick={() => onRowClick?.(row)}
                  >
                    {showCheckbox && <TableCell padding="checkbox"></TableCell>}
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={String(column.id)}
                        component={colIndex === 0 ? "th" : "td"}
                        id={colIndex === 0 ? labelId : undefined}
                        scope={colIndex === 0 ? "row" : undefined}
                        padding={column.disablePadding ? "none" : "normal"}
                        align={
                          column.align || (column.numeric ? "right" : "left")
                        }
                      >
                        {renderCellContent(column, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}
