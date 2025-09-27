import ItemsTable from "./items-table";

interface CategoryItemsProps {
  categoryId: string;
}

export default function CategoryItems({ categoryId }: Readonly<CategoryItemsProps>) {
  return <ItemsTable categoryId={categoryId} />;
}
