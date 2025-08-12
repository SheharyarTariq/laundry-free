import React, { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export type Column<T> = {
  id: string;
  label: string;
  numeric?: boolean;
  renderCell?: (row: T) => React.ReactNode;
  disableSort?: boolean;
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyAccessor: (row: T) => string;
  initialOrderBy?: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
};

type Order = 'asc' | 'desc';

export default function GenericTable<T>({
  data,
  columns,
  keyAccessor,
  initialOrderBy,
  onRowClick,
  loading = false,
}: GenericTableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | null>(initialOrderBy ?? null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property: string) => () => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(property);
      setOrder('asc');
    }
  };
  

  const visibleRows = useMemo(() => {
    const rows = data.slice();
  
    if (orderBy) {
      rows.sort((a, b) => {
        const aVal = a[orderBy as keyof T];
        const bVal = b[orderBy as keyof T];
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, order, orderBy, page, rowsPerPage]);
  

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }}>
        <TableContainer>
          <MuiTable sx={{ minWidth: 750 }} size="medium">
            <TableHead sx={{ '& .MuiTableCell-head': { backgroundColor: '#F9FAFB', color: '#667085' } }}>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.numeric ? 'right' : 'left'}
                    sortDirection={!col.disableSort && orderBy === col.id ? order : false}
                  >
                    {col.disableSort ? (
                      col.label
                    ) : (
                      <TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : 'asc'} onClick={handleRequestSort(col.id)}>
                        {col.label}
                        {orderBy === col.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={keyAccessor(row)} sx={{ cursor: onRowClick ? 'pointer' : 'default' }} onClick={() => onRowClick && onRowClick(row)}>
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.numeric ? 'right' : 'left'}>
                      {col.renderCell ? col.renderCell(row) : row[col.id as keyof T] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{
                  height: emptyRows > 0 ? 0 : undefined
                }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ color: '#999', fontStyle: 'italic' }}
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}
