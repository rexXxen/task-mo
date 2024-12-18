"use server";

import { auth } from "@clerk/nextjs/server";
import { CreateLabel } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, color, cardId } = data;
  let label;

  try {
    const board = await db.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
      };
    }
    label = await db.label.create({
      data: {
        name: name,
        cardId,
        color: color,
      },
    });
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: "Failed to create label ",
    };
  }


    await createAuditLog({
      entityId: label.id,
      entityTitle: label.name,
      entityType: ENTITY_TYPE.LABEL,
      action: ACTION.CREATE,
    });

  return {
    data: label,
  };
};

export const createLabel = createSafeAction(CreateLabel, handler);
