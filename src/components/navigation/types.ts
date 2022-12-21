export interface MobileHeadingProps {
  onOpen: () => void;
}

export interface NavMenuProps {
  onNavClicked?: () => void;
}

export interface NavLinkProps {
  label: string;
  to: string;
  onNavClicked?: () => void;
}
