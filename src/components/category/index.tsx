"use client";
import React, { useEffect, useState } from "react";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import CategorySearch from "./category-search";
import CategoryTable from "./category-table";
import PrimaryButton from "@/components/common/primary-button";
import AddIcon from "@mui/icons-material/Add";

interface CategoryType {
  id: string;
  name: string;
  description: string | null;
}

function Category() {
  const [data, setData] = useState<CategoryType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = searchTerm ? `?name=${encodeURIComponent(searchTerm)}` : "";
        const response = await apiCall({
          endpoint: `${routes.api.categories}${query}`,
          isProtected: true,
          method: "GET",
        });

        const categories: CategoryType[] = response?.data?.member || [];
        setData(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const timeoutId = setTimeout(fetchCategories, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Categories</h1>
    <div className="mb-4 flex items-center gap-4 justify-between">
      <div className="flex-1">
        <CategorySearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <PrimaryButton>
        <AddIcon fontSize="small" />{" "}
        Create
      </PrimaryButton>
    </div>
    <CategoryTable data={data} />
    </div>
  );
}

export default Category;
