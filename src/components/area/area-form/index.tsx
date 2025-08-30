import FormDialog from '@/components/common/form-dailog';
import Input from '@/components/common/input';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';
import React, { useState } from 'react'
import { revalidatePathAction } from '@/app/actions/revalidate-path';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface AreaForm {
  startTransition: React.TransitionStartFunction;
}

const AreaForm:React.FC<AreaForm> = ({startTransition}) => {
  const [areaName, setAreaName] = useState('');
  const [submitFormloading, setSubmitFormLoading] = useState(false);
  return (
    <FormDialog
      title="Create Area"
      buttonText="Create"
      saveButtonText="Save Area"
      loading={submitFormloading}
      onSubmit={async () => {
        try{
          setSubmitFormLoading(true);
          const response = await apiCall({
            endpoint: routes.api.postArea,
            method: 'POST',
            isProtected: true,
            data: {
              name: areaName
            }
          })
          if(response.status === 201){
            startTransition(async () => {
              await revalidatePathAction(routes.ui.areaDetailPage(areaId))
            });
            toast.success("Area added successfully")
            setAreaName("");
          }
          return true;
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
          return false;
        } finally{
          setSubmitFormLoading(false);
        }
      }}
    >
      <Input value={areaName} onChange={(e) => setAreaName(e.target.value)} label="Area Name" placeholder="Enter area name" />
    </FormDialog>
  )
}

export default AreaForm