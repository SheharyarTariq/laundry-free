'use client'
import React, { useTransition } from 'react'
import CategoryTable from './category-table'
import CategoryForm from './category-form'
import CategorySearch from './category-table/category-search'

interface CategoryProps {
  data: {
    member: CategoryType[]
    totalItems: number;
    view: {
      next: string
    }
  }
  currentPage: string;
}

interface CategoryType {
  id: string;
  name: string;
  description: string | null;
}

const Category: React.FC<CategoryProps> = ({ data, currentPage }) => {
  const [loading, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <h1 className='text-2xl font-bold'>Categories</h1>
      </div>
      <div>
        <div className="flex gap-x-4">   
          <CategorySearch />
          <CategoryForm startTransition={startTransition}/>
        </div>
      </div>
      <CategoryTable
        data={data.member}
        currentPage={currentPage}
        loading={loading}
        totalItems={data.totalItems}
      />
    </div>
  )
}

export default Category