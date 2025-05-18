import type { $Enums } from "@/prisma";
import { BookmarkCheck, BookmarkX, Clock, Loader } from "lucide-react";

type IconStatus = { [status in $Enums.StatusOrder]?: React.ReactNode };

const iconStatus: IconStatus = {
	PENDING: <Clock />,
	CANCELLED: <BookmarkX />,
	COMPLETED: <BookmarkCheck />,
	IN_PROGRESS: <Loader className="animate-spin" />,
};

export { iconStatus };
