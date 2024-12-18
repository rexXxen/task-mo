"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  forwardRef,
  useRef,
  ElementRef,
  KeyboardEventHandler,
} from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { useTheme } from "next-themes"; 
import { cn } from "@/lib/utils";

import { useAction } from "@/hooks/use-actions";
import { createCard } from "@/actions/create-card";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
}, ref) => {
  const params = useParams();
  const { theme } = useTheme(); 
  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" created`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = params.boardId as string;

    execute({ title, listId, boardId });
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className={cn( 
          "m-1 py-0.5 px-1 space-y-4",
        theme === "dark" ? " text-white" : " text-black"
        )}
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareakeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        className={cn( 
          "m-1 py-0.5 px-1 space-y-4",
          theme === "dark" ? "bg-gray-700 bg-opacity-50 text-white" : "bg-white bg-opacity-50 text-black"
        )}

        />
        <input
          hidden
          id="listId"
          name="listId"
          value={listId}
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Add card
          </FormSubmit>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className={cn( 
          "h-auto px-2 py-1.5 w-full justify-start text-sm",
          theme === "dark" ? "text-neutral-500 hover:bg-gray-600" : "text-muted-foreground"
        )}
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";
