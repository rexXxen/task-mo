import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz'; 
import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  const date = new Date(data.createdAt);
  const zonedDate = toZonedTime(date, 'Asia/Manila'); 
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(zonedDate, "MMM d, yyyy 'at' h:mm a")} 
        </p>
      </div>
    </li>
  );
};