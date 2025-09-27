import CategoryDetails from '@/components/category/category-details';

type Params = Promise<{ categoryId: string }>


export default async function Page(props: { params: Params }) {
  const params =await props.params;
  const categoryId = params.categoryId;
  
  return <CategoryDetails id={categoryId} />;
}


