import Search from "@/components/common/search";
import { routes } from "@/lib/utils/routes";

export default function OrderSearch() {
  return (<Search placeholder="Search orders…" searchRoute={routes.ui.order} />);
}

