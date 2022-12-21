export interface SlideshowThumbnailProps {
  image_url: string;
  date: string;
  media_type: string;
  highlight: boolean;
  onClick: () => void;
}
