import React, { useState, useEffect } from "react";
import FormDialog from "@/components/common/form-dailog";
import Input from "@/components/common/input";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CategoryEdit({ id, name, description, onUpdated }: Readonly<{ id: string; name: string; description?: string | null; onUpdated?: () => void }>) {
  const [formName, setFormName] = useState(name || "");
  const [formDescription, setFormDescription] = useState(description || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormName(name || "");
    setFormDescription(description || "");
  }, [name, description]);

  return (
    <FormDialog
      title="Edit Category"
      buttonText={<><EditIcon fontSize="small" /> Edit</>}
      saveButtonText="Save"
      loading={loading}
      onSubmit={async () => {
        try {
          setLoading(true);
          const response = await apiCall({
            endpoint: routes.api.categorydetails(id),
            method: "PUT",
            isProtected: true,
            data: { name: formName, description: formDescription },
          });
          if (response.status === 200) {
            toast.success("Category updated");
            onUpdated?.();
            return true;
          }
          toast.error("Failed to update category");
          return false;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            type ApiErrorData = { violations?: Array<{ message: string }> };
            const apiData = error.response.data as ApiErrorData | undefined;
            const violations = apiData?.violations;
            if (violations && Array.isArray(violations) && violations.length > 0) {
              toast.error(violations[0].message);
            } else {
              toast.error("Update failed");
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
        <Input value={formName} onChange={(e) => setFormName(e.target.value)} label="Name" placeholder="Category name" required />
        <Input value={formDescription} onChange={(e) => setFormDescription(e.target.value)} label="Description" placeholder="Optional description" />
      </div>
    </FormDialog>
  );
}


