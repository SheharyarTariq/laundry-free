import { SearchInput } from "@/components/common/search-input";
import React from "react";

export default function CategorySearch({
  value,
  onChange,
  placeholder = "Search category…",
}: Readonly<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}>) {
  return (
    <SearchInput value={value} onChange={onChange} placeholder={placeholder} />
  );
}


