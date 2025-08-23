import React from 'react'
import Area from '@/components/area'
import { routes } from '@/lib/utils/routes';
import { apiRequest } from '@/lib/utils/api-request';
type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function Page(props:{ searchParams: SearchParams}) {
  const searchParams = await props.searchParams
  const page = searchParams.page || '1';
  const data = await apiRequest({
    endpoint: routes.api.getAreas(page),
    isProtected: true,
    method: "GET",
  });
  return <Area data={data} currentPage={page }/>
}
