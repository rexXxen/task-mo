import { Card, Label, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };
export type CardWithList = Card & { list: List[]};
export type CardWithLabel = Card & { labels: Label[] };