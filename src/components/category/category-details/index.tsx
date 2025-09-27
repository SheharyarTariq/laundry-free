import CategoryBasicInfo from "./category-basic-info";
import CategoryItems from "./category-items";

export default function CategoryDetails({ id }: Readonly<{ id: string }>) {
  return (
    <>
      <CategoryBasicInfo id={id} />
      <CategoryItems categoryId={id} />
    </>
  );
}


