import React from 'react'
import EastIcon from '@mui/icons-material/East';
import GenericTable, { Column } from '@/components/common/generic-table';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/utils/routes';

interface Member {
  id: string;
  name: string;
}

export default function CategoryTable({ data, totalItems, loading, currentPage } : Readonly<{ 
  data: Member[];
  loading:boolean;
  totalItems: number;
  currentPage: string;
}>) {
  const router = useRouter();

  const columns: Column<Member>[] = [
    { id: 'name', label: 'Name' },
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
    router.push(`${routes.ui.category}?page=${newPage + 1}`);
  };
  
  return (
    <GenericTable<Member>
      loading={loading}
      data={data}
      totalItems={totalItems}
      columns={columns}
      keyAccessor={(row) => row.id}
      initialOrderBy="name"
      page={pageIndex}
      rowsPerPage={rowsPerPage}
      onRowClick={(row) => router.push(`${routes.ui.category}/${row.id}`)}
      onPageChange={handlePageChange}
    />
  );
}