import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const BackArrow = () => {
    const router = useRouter();
    
    const handleBackClick = () => {
        router.back();
    };
    
    return (
        <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            title="Go back"
        >
            <ArrowBackIcon className="text-gray-600" />
        </button>
    );
};

export default BackArrow;