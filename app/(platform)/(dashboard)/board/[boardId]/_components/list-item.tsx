"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { CardWithLabel, ListWithCards } from "@/types";
import { useTheme } from "next-themes"; 

import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

interface ListItemProps {
  data: ListWithCards;
  index: number;
};

export const ListItem = ({
  data,
  index,
}: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, []);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  
  if(!mounted) {
    return null;
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className={cn(
              "w-full rounded-md shadow-md pb-2 text-white",
              theme === "dark"
                ? "bg-custom-dark bg-opacity-75"
                : "bg-white bg-opacity-75"
            )}
          >

            <ListHeader
              onAddCard={enableEditing}
              data={data}
            />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0",
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem
                      index={index}
                      key={card?.id}
                      data={card}
                      card={card as CardWithLabel}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};