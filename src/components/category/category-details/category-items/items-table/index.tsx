"use client";
import React, { useEffect, useState } from "react";
import apiCall from "@/lib/utils/api-call";
import { routes } from "@/lib/utils/routes";
import GenericTable, { Column } from "@/components/common/generic-table";
import ItemsDelete from "../items-delete";
import ItemsAdd from "../items-add";

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

interface ItemsTableProps {
  categoryId: string;
}

export default function ItemsTable({ categoryId }: Readonly<ItemsTableProps>) {
  const [data, setData] = useState<ItemRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await apiCall({
          endpoint: routes.api.categoryitems(categoryId),
          method: "GET",
          isProtected: true,
        });
        console.log("Full Items API response:", JSON.stringify(response, null, 2));
        console.log("Response data:", JSON.stringify(response?.data, null, 2));
        console.log("Response data member:", JSON.stringify(response?.data?.member, null, 2));
        const rawItems = response?.data?.member || [];
        
        // Transform the data to handle object fields properly
        const items: ItemRow[] = rawItems.map((item: any) => ({
          id: item.id || '',
          name: item.name || '',
          description: item.description || null,
          piece: item.piece || 0,
          price: item.price || { type: '', washing: null, dry_cleaning: null },
        }));
        
        setData(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [categoryId]);

  const columns: Column<ItemRow>[] = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "piece", label: "Piece" },
    { 
      id: "price", 
      label: "Price Type", 
      renderCell: (row: ItemRow) => {
        return row.price?.type || "N/A";
      }
    },
    { 
      id: "washing", 
      label: "Washing Price", 
      renderCell: (row: ItemRow) => {
        return row.price?.washing ? `$${row.price.washing}` : "N/A";
      }
    },
    { 
      id: "dry_cleaning", 
      label: "Dry Cleaning Price", 
      renderCell: (row: ItemRow) => {
        return row.price?.dry_cleaning ? `$${row.price.dry_cleaning}` : "N/A";
      }
    },
    {
      id: "actions",
      label: "Actions",
      numeric: false,
      disableSort: true,
      renderCell: (row: ItemRow) => (
        <div className="focus:outline-none">
          <ItemsDelete item={row} onDeleted={() => window.location.reload()} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Items in this Category</h2>
      <ItemsAdd categoryId={categoryId} onItemAdded={() => window.location.reload()} />
      <GenericTable<ItemRow>
        loading={loading}
        data={data}
        totalItems={data.length}
        columns={columns}
        keyAccessor={(row) => row.id}
        initialOrderBy="name"
        page={0}
        rowsPerPage={10}
      />
    </div>
  );
}
