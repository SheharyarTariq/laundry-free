import FormDialog from '@/components/common/form-dailog';
import Input from '@/components/common/input';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const AreaForm = () => {
  const [areaName, setAreaName] = useState('')
  const router = useRouter();
  return (
    <FormDialog
      title="Create Area"
      buttonText="Create"
      saveButtonText="Save Area"
      onSubmit={async () => {
        const response = await apiCall({
          path: routes.api.postArea,
          method: 'POST',
          isProtected: true,
          data: {
            name: areaName
          }
        })
        router.refresh();
      }}
    >
      <Input value={areaName} onChange={(e) => setAreaName(e.target.value)} label="Area Name" placeholder="Enter area name" />
    </FormDialog>
  )
}

export default AreaForm