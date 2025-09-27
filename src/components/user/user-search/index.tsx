import Search from "@/components/common/search";
import { routes } from "@/lib/utils/routes";

export default function UserSearch() {
  return (<Search placeholder="Search users…" searchRoute={routes.ui.user} />);
}

