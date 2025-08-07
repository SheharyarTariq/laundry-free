import React from 'react'

export default async function Page({ params }: { params: { areaId: string } }) {
  const { areaId } =await params;
  
  return (
    <div>AreaPage</div>
  )
}
