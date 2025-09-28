"use client"
import React from 'react';
import EastIcon from '@mui/icons-material/East';
import GenericTable, { Column } from '@/components/common/generic-table';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/utils/routes';

interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function UserTable({ data, totalItems, loading, currentPage }: Readonly<{ 
  data: User[];
  loading: boolean;
  totalItems: number;
  currentPage: string;
}>) {
  const router = useRouter();

  const columns: Column<User>[] = [
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { 
      id: 'address', 
      label: 'Address',
      renderCell: (row) => {
        const address = row.address as Address;
        if (address && typeof address === 'object') {
          const addressParts = [];
          if (address.street) addressParts.push(address.street);
          if (address.city) addressParts.push(address.city);
          if (address.state) addressParts.push(address.state);
          if (address.zipCode) addressParts.push(address.zipCode);
          return addressParts.length > 0 ? addressParts.join(', ') : 'No address';
        }
        return 'No address';
      }
    },
    { 
      id: 'emailVerifiedAt', 
      label: 'Email Verified',
      renderCell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.emailVerifiedAt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.emailVerifiedAt ? 'Verified' : 'Not Verified'}
        </span>
      )
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
    router.push(`${routes.ui.user}?page=${newPage + 1}`);
  };
  
  return (
    <GenericTable<User>
      loading={loading}
      data={data}
      totalItems={totalItems}
      columns={columns}
      keyAccessor={(row) => row.id}
      initialOrderBy="createdAt"
      page={pageIndex}
      rowsPerPage={rowsPerPage}
      onRowClick={(row) => router.push(routes.ui.userDetailPage(row.id))}
      onPageChange={handlePageChange}
    />
  );
}
