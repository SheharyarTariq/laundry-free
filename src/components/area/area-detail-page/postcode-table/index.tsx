import EastIcon from '@mui/icons-material/East';
import GenericTable, { Column } from '@/components/common/generic-table';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/utils/routes';

interface Member {
  id: string;
  name: string;
}

export default function PostcodeTable({id='', data, totalItems, loading, currentPage } :
  { 
    data: Member[];
    loading:boolean;
    totalItems: number;
    currentPage: string;
    id?: string;
  }) {
    const router = useRouter();

  const columns: Column<Member>[] = [
    { id: 'postcode', label: 'Postcodes' },

    {
      id: 'action',
      label: 'Action',
      numeric: true,
      disableSort: true,
      renderCell: () => <EastIcon sx={{ color: '#646464' }} />,
    },
  ];

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    router.push(routes.ui.paginatedPostcodes(id, (newPage + 1)));
  };
  

  return (
    <GenericTable<Member>
      loading={loading}
      data={data}
      totalItems={totalItems}
      columns={columns}
      keyAccessor={(row) => row.id}
      initialOrderBy="postcode"
      page={Number(currentPage)-1}
      rowsPerPage={10}
      onRowClick={(row) => router.push(routes.ui.areaDetailPage(row.id))}
      onPageChange={handlePageChange}
      // onRowsPerPageChange={(rows) => {/* handle rows per page change */}}
    />
  );
}

