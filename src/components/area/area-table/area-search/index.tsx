
import { routes } from "@/lib/utils/routes";
import Search from "@/components/common/search";


export default function CategorySearch() {
 return (<Search placeholder="Search Area" searchRoute={routes.ui.areas} />);

}


