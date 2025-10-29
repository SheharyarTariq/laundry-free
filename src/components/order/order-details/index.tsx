'use client'
import React from 'react'
import OrderDetailsTable from './order-table'

type OrderDetail = {
  id: number | string
  status: string
  pickupDate: string
  dropoffDate: string
  note: string
  number: string
  createdAt: string
  pickupSlot?: { startTime?: string; endTime?: string }
  dropoffSlot?: { startTime?: string; endTime?: string }
}

export default function OrderDetails({ order }: Readonly<{ order: OrderDetail }>) {
  return (
    <OrderDetailsTable order={order} />
  )
}


