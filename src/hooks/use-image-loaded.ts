import { useEffect, useState } from "react";

interface UseImageLoadedProps {
  url: string;
}

const useImageLoaded = ({ url }: UseImageLoadedProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    const image = new Image();
    image.onload = () => setImageLoaded(true);
    image.src = url;
  }, [url]);

  return { imageLoaded };
};

export default useImageLoaded;
