import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GenericTable, { Column } from "@/components/common/generic-table";

interface CategoryRow {
  id: string;
  name: string;
}

export default function CategoryTable({ data }: { data: CategoryRow[] }) {
  const columns: Column<CategoryRow>[] = [
    { id: "name", label: "Name" },
    {
      id: "action",
      label: "Actions",
      numeric: true,
      disableSort: true,
      renderCell: () => <ArrowForwardIosIcon fontSize="small" />,
    },
  ];

  return (
    <GenericTable<CategoryRow>
      data={data}
      totalItems={data.length}
      columns={columns}
      keyAccessor={(row) => row.id}
      initialOrderBy="name"
      page={0}
      rowsPerPage={10}
    />
  );
}


