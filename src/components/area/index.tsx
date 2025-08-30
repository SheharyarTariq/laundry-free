'use client'
import React, { useTransition } from 'react'
import AreaTable from './area-table'
import AreaForm from './area-form'
import { SearchInput } from '../common/search-input'
import { useState } from 'react'
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
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, startTransition] = useTransition();
  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <h1 className='text-2xl font-bold'>Areas</h1>
      </div>
      <div>
        <label htmlFor="search" className="text-sm font-medium">Search</label>
        <div className="flex gap-x-4">   
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="name"
          />  
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