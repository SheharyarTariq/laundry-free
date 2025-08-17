import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default async function Page({ params }: { params: { areaId: string } }) {
  const { areaId } =await params;
  
  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <div className="flex items-center gap-x-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
          <p className="">Areas</p>
        </div>
        <h1 className='text-2xl font-bold'>Areas/{areaId}</h1>
      </div>
    </div>
  )
}
