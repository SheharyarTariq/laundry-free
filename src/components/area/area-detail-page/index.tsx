'use client'
import React, { useState, useTransition } from 'react'
import FormDialog from '@/components/common/form-dailog';
import toast from 'react-hot-toast';
import axios from 'axios';
import apiCall from '@/lib/utils/api-call';
import PostcodeTable from './postcode-table';
import { ArrowLeft } from 'lucide-react'
import { Typography } from '@mui/material';
import { routes } from '@/lib/utils/routes';
import { useRouter } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions/revalidate-path';
import Input from '@/components/common/input';

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
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-6 p-8">
      <div>
        <div className="flex items-center gap-x-2">
          <ArrowLeft className="w-6 h-6 text-primary" />
          <p className="">Areas</p>
        </div>
        <div className="justify-between">
          <h1 className='text-2xl font-bold'>Areas</h1>
          <FormDialog
            title="Delete Area"
            buttonText="Delete"
            saveButtonText="Delete Area"
            loading={submitFormloading}
            onSubmit={async () => {
              try{
                setSubmitFormLoading(true);
                const response = await apiCall({
                  endpoint: routes.api.deleteArea(areaId),
                  method: 'DELETE',
                  isProtected: true,
                })
                if(response.status === 204){
                  startTransition(async () => {
                    await revalidatePathAction(routes.ui.areas)
                  });
                  toast.success("Area deleted successfully")
                  router.push(routes.ui.areas)
                }
                return true;
              }
              catch(error) {
                if (axios.isAxiosError(error) && error.response?.data) {
                  const violations = error.response.data?.violations;
                  if (Array.isArray(violations) && violations.length > 0) {
                    toast.error(violations[0].message)
                  }
                } else {
                  toast.error("An unexpected error occurred.");
                  console.log("Unexpected error in post area:", error);
                }
                return false;
              } finally {
                setSubmitFormLoading(false);
              }
            }}
          >
            <Typography>Are you sure you want to Delete this area?</Typography>
          </FormDialog>
          <FormDialog
            title="Add Postcode"
            buttonText="Add Postcode"
            saveButtonText="Add"
            loading={submitFormloading}
            onSubmit={async () => {
              try{
                setSubmitFormLoading(true);
                const response = await apiCall({
                  endpoint: routes.api.postPostcode,
                  method: 'POST',
                  isProtected: true,
                  data: {postcode,area:`/areas/${areaId}`}
                })
                if(response.status === 201){
                  startTransition(async () => {
                    await revalidatePathAction(routes.api.getPostcodes(areaId))
                  });
                  toast.success("Postcode added successfully")
                }
                return true;
              }
              catch(error) {
                if (axios.isAxiosError(error) && error.response?.data) {
                  const violations = error.response.data?.violations;
                  if (Array.isArray(violations) && violations.length > 0) {
                    toast.error(violations[0].message)
                  }
                } else {
                  toast.error("An unexpected error occurred.");
                  console.log("Unexpected error in post area:", error);
                }
                return false;
              } finally {
                setSubmitFormLoading(false);
              }
            }}
          >
            <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} label="Postcode" placeholder="Enter postcode"/>
          </FormDialog>
        </div>
        <PostcodeTable
          id={areaId}
          data={data.member}
          currentPage={currentPage}
          loading={loading}
          totalItems={data.totalItems}
        />
      </div>
    </div>
  )
}

export default AreaDetailPage