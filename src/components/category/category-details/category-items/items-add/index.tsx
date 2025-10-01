"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
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
  const [washingPrice, setWashingPrice] = useState("");
  const [dryCleaningPrice, setDryCleaningPrice] = useState("");
  const [isFixedPrice, setIsFixedPrice] = useState(true);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!name.trim()) {
        toast.error("Name is required");
        return false;
      }
      
      if (!piece || isNaN(parseInt(piece)) || parseInt(piece) < 0) {
        toast.error("Piece must be a valid positive number");
        return false;
      }
      
      if (!washingPrice || isNaN(parseFloat(washingPrice)) || parseFloat(washingPrice) < 0) {
        toast.error("Washing price must be a valid positive number");
        return false;
      }
      
      if (!dryCleaningPrice || isNaN(parseFloat(dryCleaningPrice)) || parseFloat(dryCleaningPrice) < 0) {
        toast.error("Dry cleaning price must be a valid positive number");
        return false;
      }
      
      const requestData = {
        category: `/item-categories/${categoryId}`,
        name: name.trim(),
        description: description.trim() || "",
        piece: parseInt(piece, 10),
        price: {
          washing: parseFloat(washingPrice),
          dry_cleaning: parseFloat(dryCleaningPrice),
          type: isFixedPrice ? 'fixed' : 'variable'
        }
      };

      const response = await apiCall({
        // endpoint: routes.api.postcategoryitems(categoryId),
        endpoint: routes.api.postcategoryitems,
        method: "POST",
        isProtected: true,
        data: requestData,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Item created successfully");
        setName("");
        setDescription("");
        setPiece("");
        setWashingPrice("");
        setDryCleaningPrice("");
        setIsFixedPrice(true);
        onItemAdded?.();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating item:", error);
      
      // if (error.response?.data?.message) {
      //   toast.error(`Failed to create item: ${error.response.data.message}`);
      // } else {
        toast.error("Failed to create item");
      // }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <FormDialog
        title="New Item"
        buttonText={<><AddIcon fontSize="small" /> Add</>}
        saveButtonText="Create"
        loading={loading}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name*"
            placeholder="i.e Jeans"
            required
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            placeholder="Description"
          />
          <Input
            value={piece}
            onChange={(e) => setPiece(e.target.value)}
            label="Piece*"
            placeholder="i.e 10"
            type="number"
            required
          />
          <Input
            value={washingPrice}
            onChange={(e) => setWashingPrice(e.target.value)}
            label="Washing Price*"
            placeholder="i.e 12.95"
            type="number"
            step="0.01"
            required
          />
          <Input
            value={dryCleaningPrice}
            onChange={(e) => setDryCleaningPrice(e.target.value)}
            label="Dry Cleaning Price*"
            placeholder="i.e 15.50"
            type="number"
            step="0.01"
            required
          />
        
        </div>
      </FormDialog>
    </div>
  );
}