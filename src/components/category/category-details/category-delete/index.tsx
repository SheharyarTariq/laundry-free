import React, { useState } from "react";
import FormDialog from "@/components/common/form-dailog";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function CategoryDelete({ id }: Readonly<{ id: string }>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <FormDialog
      title="Delete Category"
      buttonText= "Delete"
      saveButtonText="Confirm"
      loading={loading}
      onSubmit={async () => {
        try {
          setLoading(true);
          const response = await apiCall({
            endpoint: routes.api.categorydetails(id, ""),
            method: "DELETE",
            isProtected: true,
          });
          if (response.status === 204 || response.status === 200) {
            toast.success("Category deleted");
            router.push(routes.ui.category);
            return true;
          }
          toast.error("Failed to delete category");
          return false;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error("Delete failed");
          } else {
            toast.error("An unexpected error occurred.");
          }
          return false;
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className=" text-gray-700">
        Are you sure you want to delete this category?
      </div>
    </FormDialog>
  );
}


