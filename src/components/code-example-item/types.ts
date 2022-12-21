import { MouseEventHandler } from "react";

export interface CodeExampleItemProps {
  title: string;
  poster: string;
  onClick: MouseEventHandler;
  source: string;
}
