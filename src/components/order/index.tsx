'use client'
import React, { useTransition } from 'react'
import OrderTable from './order-table'
import OrderSearch from './order-search'

interface OrderProps {
  data: {
    member: OrderType[]
    totalItems: number;
    view: {
      next: string
    }
  }
  currentPage: string;
}

interface OrderType {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  deliveryDate?: string;
}

const Order: React.FC<OrderProps> = ({ data, currentPage }) => {
  const [loading, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <h1 className='text-2xl font-bold'>Orders</h1>
      </div>
      <div>
        <div className="flex gap-x-4">   
          <OrderSearch />
        </div>
      </div>
      <OrderTable
        data={data.member}
        currentPage={currentPage}
        loading={loading}
        totalItems={data.totalItems}
      />
    </div>
  )
}

export default Order
