
import React, { useState, useTransition } from 'react'
import FormDialog from '@/components/common/form-dailog';
import toast from 'react-hot-toast';
import axios from 'axios';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';
import { revalidatePathAction } from '@/app/actions/revalidate-path';
import Input from '@/components/common/input';
import { Plus } from 'lucide-react';

interface AddPostcodProps {
  areaId: string;
  submitFormloading: boolean
  setSubmitFormLoading: React.Dispatch<React.SetStateAction<boolean>>
  startTransition: (callback: () => void) => void
}

const AddPostcode:React.FC<AddPostcodProps> = ({ areaId, submitFormloading, setSubmitFormLoading, startTransition}) => {
  const [postcode, setPostcode] = useState("");

  return (
    <FormDialog
    title="Add"
    buttonText={ <><Plus /> Add</>}
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
            await revalidatePathAction(routes.ui.areaDetailPage(areaId))
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
        }
        return false;
      } finally {
        setSubmitFormLoading(false);
      }
    }}
  >
    <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} label="Postcode" placeholder="e.g KT237 RT"/>
  </FormDialog>
  )
}

export default AddPostcode