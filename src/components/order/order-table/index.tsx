import React from 'react';
import EastIcon from '@mui/icons-material/East';
import GenericTable, { Column } from '@/components/common/generic-table';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/utils/routes';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  deliveryDate?: string;
}

export default function OrderTable({ data, totalItems, loading, currentPage }: Readonly<{ 
  data: Order[];
  loading: boolean;
  totalItems: number;
  currentPage: string;
}>) {
  const router = useRouter();

  const columns: Column<Order>[] = [
    { id: 'orderNumber', label: 'Order Number' },
    { id: 'customerName', label: 'Customer Name' },
    { 
      id: 'status', 
      label: 'Status',
      renderCell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' :
          row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          row.status === 'processing' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      id: 'totalAmount', 
      label: 'Total Amount',
      numeric: true,
      renderCell: (row) => `$${row.totalAmount.toFixed(2)}`
    },
    { 
      id: 'createdAt', 
      label: 'Created Date',
      renderCell: (row) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      id: 'action',
      label: 'Action',
      numeric: true,
      disableSort: true,
      renderCell: () => <EastIcon sx={{ color: '#646464' }} />,
    },
  ];

  const rowsPerPage = 10;
  const pageIndex = Math.max(0, Number(currentPage) - 1);

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    router.push(`${routes.ui.order}?page=${newPage + 1}`);
  };
  
  return (
    <GenericTable<Order>
      loading={loading}
      data={data}
      totalItems={totalItems}
      columns={columns}
      keyAccessor={(row) => row.id}
      initialOrderBy="createdAt"
      page={pageIndex}
      rowsPerPage={rowsPerPage}
      onRowClick={(row) => router.push(`${routes.ui.order}/${row.id}`)}
      onPageChange={handlePageChange}
    />
  );
}
