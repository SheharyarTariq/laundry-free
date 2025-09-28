import React from 'react';
import FormDialog from '@/components/common/form-dailog';
import toast from 'react-hot-toast';
import axios from 'axios';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';
import { useRouter } from 'next/navigation';
import { revalidatePathAction } from '@/app/actions/revalidate-path';
import { Typography } from '@mui/material';

interface DeleteAreaProps {
  areaId: string;
  submitFormloading: boolean
  setSubmitFormLoading: React.Dispatch<React.SetStateAction<boolean>>
  startTransition: (callback: () => void) => void
}

const DeleteArea: React.FC<DeleteAreaProps> = ({ areaId, submitFormloading, setSubmitFormLoading, startTransition }) => {
  const router = useRouter();
  return (
    <FormDialog
      title="Delete"
      buttonText="Delete"
      saveButtonText="Delete"
      loading={submitFormloading}
      onSubmit={async () => {
        try{
          setSubmitFormLoading(true);
          const response = await apiCall({
            endpoint: routes.api.deleteArea(areaId),
            method: 'DELETE',
            isProtected: true,
          });
          if (response.status === 204) {
            startTransition(async () => {
              await revalidatePathAction(routes.ui.areas);
            });
            toast.success("Area deleted successfully");
            router.push(routes.ui.areas);
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
      <Typography>Are you sure you want to Delete this area?</Typography>
  </FormDialog>
  )
}

export default DeleteArea
