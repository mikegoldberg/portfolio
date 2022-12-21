import { ReactElement } from "react";

export interface CustomScrollbarsProps {
  onScrollFrame: (position: number) => void;
  children?: ReactElement;
}
