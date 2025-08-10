import FormDialog from '@/components/common/form-dailog';
import Input from '@/components/common/input';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';
import React, { useState } from 'react'
import { revalidatePathAction } from '@/app/actions/revalidate-path';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AreaForm = () => {
  const [areaName, setAreaName] = useState('')
  return (
    <FormDialog
      title="Create Area"
      buttonText="Create"
      saveButtonText="Save Area"
      onSubmit={async () => {
        try{
          const response = await apiCall({
            path: routes.api.postArea,
            method: 'POST',
            isProtected: true,
            data: {
              name: areaName
            }
          })
          if(response.status === 201){
            await revalidatePathAction(routes.ui.areas)
            toast.success("Area added successfully")
          }
      }
        catch(error){
          if (axios.isAxiosError(error) && error.response?.data) {
            const violations = error.response.data?.violations;
            if (Array.isArray(violations) && violations.length > 0) {
              toast.error(violations[0].message)
            }
          } else {
            toast.error("An unexpected error occurred.");
            console.log("Unexpected error in post area:", error);
          }
        }
      }}
    >
      <Input value={areaName} onChange={(e) => setAreaName(e.target.value)} label="Area Name" placeholder="Enter area name" />
    </FormDialog>
  )
}

export default AreaForm