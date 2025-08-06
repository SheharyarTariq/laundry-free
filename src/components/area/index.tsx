'use client'
import React from 'react'
import AreaTable from './area-table'
import AreaForm from './area-form'
import { SearchInput } from '../common/search-input'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

interface AreaProps {
  data: {
    member: {
      id: string;
      name: string;
    }[]
  }
}

const Area:React.FC<AreaProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <div className="flex items-center gap-x-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
          <p className="">Areas</p>
        </div>
        <h1 className='text-2xl font-bold'>Areas</h1>
      </div>
      <div>
        <label htmlFor="search" className="text-sm font-medium">Search</label>
        <div className="flex gap-x-4">   
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pages…"
          />  
          <AreaForm />
        </div>
      </div>
        <AreaTable data={data}/>
    </div>
  )
}

export default Area