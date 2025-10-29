import React from 'react'
import OrderDetails from '@/components/order/order-details'
import { apiRequest } from '@/lib/utils/api-request'
import { routes } from '@/lib/utils/routes'

type Params = Promise<{ orderId: string }>

export default async function Page(props: Readonly<{ params: Params }>) {
  const { orderId } = await props.params
  const order = await apiRequest({
    endpoint: routes.api.getorderdetails(orderId),
    isProtected: true,
    method: 'GET',
  })
  return (
    <OrderDetails order={order} />
  )
}


