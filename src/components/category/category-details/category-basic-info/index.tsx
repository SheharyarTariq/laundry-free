"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/spinner";
import CategoryEdit from "../category-edit";
import CategoryDelete from "../category-delete";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CategoryDetailsProps {
  id: string;
}

interface Category {
  id: string;
  name: string;
  description?: string | null;
}

export default function CategoryBasicInfo({ id }: Readonly<CategoryDetailsProps>) {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await apiCall({
      endpoint: routes.api.categorydetails(id),
      method: "GET",
      isProtected: true,
    });
    setCategory(response?.data as Category);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) return <div className="p-8 min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!category) return null;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-10 h-10 rounded-lg  hover:bg-gray-50 transition-colors"
            title="Go back"
          >
            <ArrowBackIcon className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Category Details</h1>
        </div>
        {category && (
          <div className="flex items-center gap-2">
            <CategoryEdit id={category.id} name={category.name} description={category.description} onUpdated={fetchDetails} />
            <CategoryDelete id={category.id} />
          </div>
        )}
      </div>

      <div className="rounded-xl border border-icy-mist shadow-custom-subtle bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
         
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Name</div>
            <div className="text-sm font-medium">{category.name}</div>
          </div>
           <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">ID</div>
            <div className="text-sm font-medium break-all">{category.id}</div>
          </div>
          <div className="p-4 md:col-span-2">
            <div className="text-xs text-gray-500">Description</div>
            <div className="text-sm font-medium whitespace-pre-wrap">{category.description || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


