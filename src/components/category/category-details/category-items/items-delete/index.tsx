"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import FormDialog from "@/components/common/form-dailog";

interface PriceObject {
  type: string;
  washing: string | null;
  dry_cleaning: string | null;
}

interface ItemRow {
  id: string;
  name: string;
  description: string | null;
  piece: number;
  price: PriceObject;
}

interface ItemsDeleteProps {
  item: ItemRow;
  onDeleted?: () => void;
}

export default function ItemsDelete({ item, onDeleted }: Readonly<ItemsDeleteProps>) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await apiCall({
        endpoint: routes.api.deletecategoryitem(item.id),
        method: "DELETE",
        isProtected: true,
      });

      if (response.status === 204 || response.status === 200) {
        toast.success("Item deleted successfully");
        onDeleted?.();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormDialog
      title="Delete Item"
      buttonText= "Delete"
      saveButtonText="Confirm"
      loading={loading}
      onSubmit={handleSubmit}
    >
      <div className="text-gray-700">
        Are you sure you want to delete this item?
      </div>
    </FormDialog>
  );
}