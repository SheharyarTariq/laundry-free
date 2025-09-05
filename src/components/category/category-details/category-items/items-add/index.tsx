"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import PrimaryButton from "@/components/common/primary-button";
import FormDialog from "@/components/common/form-dailog";
import Input from "@/components/common/input";
import AddIcon from "@mui/icons-material/Add";

interface ItemsAddProps {
  categoryId: string;
  onItemAdded?: () => void;
}

export default function ItemsAdd({ categoryId, onItemAdded }: Readonly<ItemsAddProps>) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [piece, setPiece] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!name.trim()) {
        toast.error("Name is required");
        return false;
      }
      
      if (!piece || parseInt(piece) < 0) {
        toast.error("Piece must be a valid number");
        return false;
      }
      
      const requestData = {
        name: name.trim(),
        description: description.trim() || "",
        piece: parseInt(piece, 10),
        price: price || "0"
      };

      console.log("Sending data to API:", JSON.stringify(requestData, null, 2));
      console.log("API endpoint:", routes.api.postcategoryitems(categoryId));

      const response = await apiCall({
        endpoint: routes.api.postcategoryitems(categoryId),
        method: "POST",
        isProtected: true,
        data: requestData,
      });

      console.log("API response:", response);

      if (response.status === 201 || response.status === 200) {
        toast.success("Item created successfully");
        setName("");
        setDescription("");
        setPiece("");
        setPrice("");
        onItemAdded?.();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error creating item:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      if (error.response?.data?.message) {
        toast.error(`Failed to create item: ${error.response.data.message}`);
      } else {
        toast.error("Failed to create item");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <FormDialog
        title="Add New Item"
        buttonText={<PrimaryButton className="flex items-center gap-x-2"><AddIcon fontSize="small" /> Add Item</PrimaryButton>}
        saveButtonText="Create Item"
        loading={loading}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            placeholder="Item name"
            required
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            placeholder="Item description (optional)"
          />
          <Input
            value={piece}
            onChange={(e) => setPiece(e.target.value)}
            label="Piece"
            placeholder="Number of pieces"
            type="number"
            required
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            placeholder="Price (e.g., 12.95)"
            type="number"
            step="0.01"
            required
          />
        </div>
      </FormDialog>
    </div>
  );
}