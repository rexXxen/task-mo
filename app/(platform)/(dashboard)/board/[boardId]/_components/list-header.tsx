"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { useState, useRef, ElementRef } from "react";

import { useAction } from "@/hooks/use-actions";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";

import { ListOptions } from "./list-options";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({
  data,
  onAddCard,
}: ListHeaderProps) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form 
          ref={formRef}
          action={handleSubmit}  
          className="flex-1 px-[2px] bg-opacity-50"          >
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className={cn(
              "text-sm px-2 py-1 h-7 font-medium border-transparent transition",
              theme === "dark" ? "hover:border-white focus:border-black text-white" : "hover:border-input focus:border-input text-black"
            )}         
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className={cn(
            "w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent",
            theme === "dark" ? "text-white" : "text-black" 
          )}
        >
          {title}
        </div>
      )}
      <ListOptions
        onAddCard={onAddCard}
        data={data}
      />
    </div>
  );
};
