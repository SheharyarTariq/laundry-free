import React, { useState } from "react";
import FormDialog from "@/components/common/form-dailog";
import Input from "@/components/common/input";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-hot-toast";
import { revalidatePathAction } from "@/app/actions/revalidate-path";

interface CategoryFormProps {
  startTransition: React.TransitionStartFunction;
}

export default function CategoryForm({ startTransition }: Readonly<CategoryFormProps>) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <FormDialog
      title="Create Category"
      buttonText={<><AddIcon fontSize="small" /> Create</>}
      saveButtonText="Save"
      loading={loading}
      onSubmit={async () => {
        try {
          setLoading(true);
          const response = await apiCall({
            endpoint: routes.api.postCategory,
            method: "POST",
            isProtected: true,
            data: { name, description },
          });
          if (response.status === 201 || response.status === 200) {
            startTransition(async () => {
              await revalidatePathAction(routes.ui.category);
            });
            toast.success("Category created");
            setName("");
            setDescription("");
            return true;
          }
          return false;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.data) {
            const violations = error.response.data?.violations;
            if (Array.isArray(violations) && violations.length > 0) {
              toast.error(violations[0].message);
            } else {
              toast.error("Failed to create category");
            }
          } else {
            toast.error("An unexpected error occurred.");
          }
          return false;
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="space-y-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} label="Name" placeholder="e.g. Trousers" required />
        <Input value={description} onChange={(e) => setDescription(e.target.value)} label="Description" placeholder="Optional description" />
      </div>
    </FormDialog>
  );
}


