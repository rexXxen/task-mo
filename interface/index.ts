import { KeyboardEventHandler } from "react";

export interface SidebarProps {
  storageKey?: string;
}

export type Organizations = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

export type State = {
  error?: {
    title?: string;
  };
  message?: string | null;
};
export interface FormInputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultVal?: string | null;
  onBlur?: () => void;
}

export interface FormTextAreaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultVal?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

//HistoryBoard soon
export interface HistoryBoard {
  id: string;
  title: string;
  createdAt: any;
  imageThumbUrl: string | null;
}

export interface ColorProps {
  id: number;
  color: string;
}
