import React from 'react'
import { routes } from '@/lib/utils/routes';
import { apiRequest } from '@/lib/utils/api-request';
import Order from '@/components/order';

type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function Page(props: Readonly<{ searchParams: SearchParams}>) {
  const searchParams = await props.searchParams
  const page = searchParams.page || '1';
  const name = searchParams.name || '';
  const itemsPerPage = searchParams.itemsPerPage || '10';
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  params.set('page', page);
  params.set('itemsPerPage', itemsPerPage);

  const data = await apiRequest({
    endpoint: `${routes.api.orders}?${params.toString()}`,
    isProtected: true,
    method: "GET",
  });
  
  return <Order data={data} currentPage={page} />
}
