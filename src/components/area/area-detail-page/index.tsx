'use client'
import React, { useState, useTransition } from 'react'
import PostcodeTable from './postcode-table';
import { ArrowLeft } from 'lucide-react'
import DeleteArea from './delete-area';
import AddPostcode from './add-postcode';
import { routes } from '@/lib/utils/routes';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import BackArrow from '@/components/common/arrowback';

interface AreaDetailPageProps {
  areaId: string;
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

const AreaDetailPage:React.FC<AreaDetailPageProps> = ({data, currentPage, areaId}) => {
  const [submitFormloading, setSubmitFormLoading] = useState(false);
  const [loading, startTransition] = useTransition();

  return (
    <Box className="flex flex-col gap-y-6 p-8">
      <Box>
        <Box className="flex items-center gap-x-2">
          <Link href={routes.ui.areas} className="flex items-center gap-x-2 hover:cursor-pointer">
           <BackArrow/>
            <Typography>Areas</Typography>
          </Link>
        </Box>
        <Box className="flex justify-between mb-5 ml-2">
          <h1 className='text-2xl font-bold'>Areas</h1>
          <DeleteArea areaId={areaId} submitFormloading={submitFormloading} setSubmitFormLoading={setSubmitFormLoading} startTransition={startTransition}/>
        </Box>
        <PostcodeTable
          id={areaId}
          data={data.member}
          currentPage={currentPage}
          loading={loading}
          totalItems={data.totalItems}
        >
          <AddPostcode areaId={areaId} submitFormloading={submitFormloading} setSubmitFormLoading={setSubmitFormLoading} startTransition={startTransition}/>
        </PostcodeTable>
      </Box>
    </Box>
  )
}

export default AreaDetailPage