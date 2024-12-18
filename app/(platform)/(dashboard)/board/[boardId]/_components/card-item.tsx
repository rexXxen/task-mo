"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { Clock11, User2 } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { CardWithLabel } from "@/types";
import getAllLabel from "@/components/label/card-label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import formatTime from "@/constants/format-time";

interface CardItemProps {
  index: number;
  card: CardWithLabel;
  data: Card;
}

export const CardItem = ({
  data,
  card,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();
  const { organization } = useOrganization();
  const { theme } = useTheme(); 
  const [cards, setCards] = useState<CardWithLabel[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
  }, []);


  useEffect(() => {
    if (card) {
      setLoading(true);
      const fetchAllLabel = async () => {
        const res = await getAllLabel(card.id);
        setCards(res);
        setLoading(false);
      };
      fetchAllLabel();
    }
  }, [card, card.id]);


  if (!mounted) {
    return null;
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className={cn(
            "truncate py-2 px-3 text-sm rounded-md shadow-sm",
            theme === "dark"
              ? "border-2 border-transparent hover:border-white bg-custom-dark text-white bg-opacity-50"
              : "border-2 border-transparent hover:border-black bg-white text-black bg-opacity-50"
          )}
        >
          {card &&
            cards.map((card) => (
              <div key={card.id}>
                {!loading ? (
                  card.labels &&
                  card.labels.map((label) => (
                    <p
                      key={label.id}
                      className="z-50 mb-1 mx-2 text-white inline-block rounded-md text-xs font-semibold px-2 py-0 -ml-1"
                      style={{
                        backgroundColor: label.color,
                        width: "auto",
                      }}
                    >
                      {label.name}
                    </p>
                  ))
                ) : (
                  <>
                    <div className="flex">
                      <Skeleton className="w-12 h-4 bg-neutral-300" />
                      <Skeleton className="w-12 h-4 mx-2 bg-neutral-300" />
                    </div>
                  </>
                )}
              </div>
            ))}

          {data.title}

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "text-xs flex items-center mt-2",
                  theme === "dark" ? "text-white" : "text-black"
                )}
              >
                <Clock11 className="w-4 h-4" />
                <p className="ml-1">{formatTime(card.createdAt, 0)}</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center ml-1 text-xs",
                theme === "dark" ? "text-white" : "text-black"
              )}
            >
              <User2 className="w-4 h-4" />
              <p className="">{organization?.membersCount}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
