import { SearchInput } from "@/components/common/search-input";
import { routes } from "@/lib/utils/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AreaSearch() {
  const route = useRouter();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    route.push(routes.api.getAreas("1", e.target.value));
  };

  return (
    <SearchInput
      value={searchTerm}
      onChange={(e) => handleSearch(e)}
      placeholder="Search area…"
    />  
  );
}
