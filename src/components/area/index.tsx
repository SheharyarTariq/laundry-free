'use client'
import React, { useTransition } from 'react'
import AreaTable from './area-table'
import AreaForm from './area-form'
import AreaSearch from './area-table/area-search'
interface AreaProps {
  data: {
    member: Member[]
    totalItems:number;
    view: {
      next: string
    }
  }
  currentPage: string;
}
interface Member {
  id: string;
  name: string;
}

const Area:React.FC<AreaProps> = ({ data, currentPage }) => {
  const [loading, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <h1 className='text-2xl font-bold'>Areas</h1>
      </div>
      <div>
        <div className="flex gap-x-4">   
          <AreaSearch />
          <AreaForm startTransition={startTransition}/>
        </div>
      </div>
      <AreaTable
        data={data.member}
        currentPage={currentPage}
        loading={loading}
        totalItems={data.totalItems}
      />
    </div>
  )
}

export default Area