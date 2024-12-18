"use client";
import React from "react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import FormPickColor from "./form-pickcolor";
import { useAction } from "@/hooks/use-actions";
import { createLabel } from "@/actions/create-label/index";
import { toast } from "sonner";
import useFunc from "@/hooks/use-func";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormErrors } from "./form-errors";
import { PopoverClose } from "../ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const FormLabel = ({ cardId }: { cardId: string }) => {
  const { disableEditing, onKeydown, formRef, inputRef } = useFunc();
  const { execute: exeCreateLabel, fieldErrors } = useAction(createLabel, {
    onSuccess: () => {
      window.location.reload();
      toast.success("Label created!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Label create failed");
    },
  });

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeydown);

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const color = formData.get("color") as string;

    await exeCreateLabel({ name, color, cardId });
  };

  return (
    <>
      <div className="">
        <p className="text-center">Stick Label</p>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-3 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-5 w-4" />
          </Button>
        </PopoverClose>
        <form ref={formRef} action={onSubmit} className="space-y-4">
          <div className="">
            <FormPickColor id="color" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              id="name"
              label="Label title"
              type="text"
              ref={inputRef}
            />
          </div>
          <FormSubmit className="w-full">Create label</FormSubmit>
        </form>
        <FormErrors id="name" errors={fieldErrors} />
      </div>
    </>
  );
};

export default FormLabel;