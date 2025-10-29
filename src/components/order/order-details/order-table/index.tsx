'use client'
import React from 'react'
import BackArrow from '@/components/common/arrowback'
import GenericCard from '@/components/common/generic-card'

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

export default function OrderDetailsTable({ order }: Readonly<{ order: OrderDetail }>) {

  const pickupWindow = [order?.pickupSlot?.startTime, order?.pickupSlot?.endTime].filter(Boolean).join(' - ')
  const dropoffWindow = [order?.dropoffSlot?.startTime, order?.dropoffSlot?.endTime].filter(Boolean).join(' - ')

  return (
    <div className="p-8">
      <GenericCard
        title="Order Details"
        headerLeft={<BackArrow />}
        items={[
          { label: 'Order ID', value: String(order.id) },
          { label: 'Order Number', value: order.number },
          { label: 'Status', value: order.status },
          { label: 'Pickup Date', value: new Date(order.pickupDate).toLocaleString() },
          { label: 'Pickup Window', value: pickupWindow || '—' },
          { label: 'Dropoff Date', value: new Date(order.dropoffDate).toLocaleString() },
          { label: 'Dropoff Window', value: dropoffWindow || '—' },
          { label: 'Created At', value: new Date(order.createdAt).toLocaleString() },
          { label: 'Note', value: order.note || '—', colSpan: 2 },
        ]}
        columns={2}
      />
    </div>
  )
}


