import React from 'react'
import OrderDetails from '@/components/order/order-details'
import { apiRequest } from '@/lib/utils/api-request'
import { routes } from '@/lib/utils/routes'

export default async function Page({ params }: Readonly<{ params: { orderId: string } }>) {
  const { orderId } = params
  const order = await apiRequest({
    endpoint: routes.api.getorderdetails(orderId),
    isProtected: true,
    method: 'GET',
  })
  return (
    <OrderDetails order={order} />
  )
}


