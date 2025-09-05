import CategoryDetails from '@/components/category/category-details';

export default function Page({ params }: Readonly<{ params: { categoryId: string } }>) {
  return <CategoryDetails id={params.categoryId} />;
}


