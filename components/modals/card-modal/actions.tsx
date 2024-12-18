"use client";
import { toast } from "sonner";
import { Copy, EyeIcon, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-actions";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FormLabel from "@/components/form/form-label";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ 
    data, 
}: ActionsProps) => {
    const params = useParams();
    const cardModal = useCardModal();

    const { 
        execute: executeCopyCard, 
        isLoading: isLoadingCopy 
    } = useAction(
            copyCard,
        {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" copied`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
        }
    );

    const { 
        execute: executeDeleteCard, 
        isLoading: isLoadingDelete 
    } = useAction(
            deleteCard,
        {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
        }
    );

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
        id: data.id,
        boardId,
        });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
        id: data.id,
        boardId,
        });
    };

    return(
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>

            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                        variant="gray"
                        className="w-full justify-start"
                        size="inline"
                        >
                        <EyeIcon className="w-4 h-4" size="sm" />
                        <p className="ml-2">Stick Label</p>
                    </Button>
                </PopoverTrigger>
                    <PopoverContent>
                          <FormLabel cardId={data.id} />
                    </PopoverContent>
            </Popover>

            <Button 
                onClick={onCopy}
                disabled={isLoadingCopy}
                variant="gray"
                className="w-full justify-start"
                size="inline"

            >
                <Copy className="h-4 w-4 mr-2"/>
                Copy
            </Button>

            <Button 
                onClick={onDelete}
                disabled={isLoadingDelete}
                variant="gray"
                className="w-full justify-start"
                size="inline"
            >
                <Trash2 className="h-4 w-4 mr-2"/>
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};