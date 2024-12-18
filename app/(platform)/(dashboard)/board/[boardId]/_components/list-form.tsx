"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, ElementRef, useEffect } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { useAction } from "@/hooks/use-actions";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();


  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    };
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId
    });
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  } 

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className={cn( 
            "w-full p-3 rounded-md space-y-4 shadow-md",
            theme === "dark" ? "bg-custom-dark text-white bg-opacity-75" : "bg-white text-black bg-opacity-75"
          )}
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className={cn(
              "text-sm px-2 py-1 h-7 font-medium border-transparent transition",
              theme === "dark" ? "hover:border-white focus:border-black" : "hover:border-input focus:border-input"
            )}
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Add list
            </FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  };

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className={cn(
          "w-full rounded-md transition p-3 flex items-center font-medium text-sm",
          theme === "dark" ? "bg-custom-dark hover:bg-gray-600 text-white opacity-75" : "bg-white hover:bg-white/50 text-black opacity-75"
        )}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
