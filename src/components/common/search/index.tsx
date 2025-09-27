import { SearchInput } from "@/components/common/search-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ placeholder, searchRoute }: { placeholder: string; searchRoute: string }) {
  const route = useRouter();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    route.push(`${searchRoute}?name=${e.target.value}&page=1`);
  };

  return (  
    <SearchInput
      value={searchTerm}
      onChange={(e) => handleSearch(e)}
      placeholder={placeholder}
    />  
  );
}


