import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useApod } from "../../hooks";
import { SlideshowPictureDetails, SlideshowThumbnail } from "../../components";

export enum MEDIA_TYPES {
  VIDEO = "video",
}

interface DisplayItemProps {
  url: string;
  thumbnail_url: string;
  title: string;
  explanation: string;
  copyright: string;
  media_type: string;
  date: string;
}

const AstronomyPictureOfTheDay = () => {
  const [displayItemUrl, setDisplayItemUrl] = useState<string>("");
  const [displayItemImageUrl, setDisplayItemImageUrl] = useState<string>("");
  const [displayItemTitle, setDisplayItemTitle] = useState<string>("");
  const [displayItemExplanation, setDisplayExplanation] = useState<string>("");
  const [displayItemCopyright, setDisplayItemCopyright] = useState<string>("");
  const [displayItemMediaType, setDisplayItemMediaType] = useState<string>("");
  const [displayItemDate, setDisplayItemDate] = useState<string>("");
  const { data, navigate, historyIdx }: any = useApod();

  const setDisplayItem = useCallback((displayItem: DisplayItemProps) => {
    const {
      url,
      thumbnail_url,
      title,
      explanation,
      copyright,
      media_type,
      date,
    } = displayItem;
    const image_url = media_type === MEDIA_TYPES.VIDEO ? thumbnail_url : url;

    setDisplayItemUrl(url);
    setDisplayItemImageUrl(image_url);
    setDisplayItemTitle(title);
    setDisplayExplanation(explanation);
    setDisplayItemCopyright(copyright);
    setDisplayItemMediaType(media_type);
    setDisplayItemDate(date);
  }, []);

  useEffect(() => {
    const newestItem = data.at(-1);

    if (!displayItemImageUrl && newestItem.date) {
      setDisplayItem(newestItem);
    }
  }, [data, displayItemImageUrl, setDisplayItem]);

  return (
    <Flex direction="column" alignItems={"center"} userSelect="none">
      <Box width="100%">
        <SlideshowPictureDetails
          url={displayItemUrl}
          imageUrl={displayItemImageUrl}
          title={displayItemTitle}
          explanation={displayItemExplanation}
          copyright={displayItemCopyright}
          mediaType={displayItemMediaType}
        />
      </Box>
      <Flex
        width="100%"
        margin="20px 0"
        height={["70px", "70px", "100px"]}
        gap="10px"
        justifyContent={"center"}
      >
        <Box
          cursor="pointer"
          height="100%"
          fontSize="4xl"
          display="flex"
          alignItems={"center"}
          padding="10px"
          position="relative"
          transition={"padding 300ms"}
          _hover={{
            padding: "10px 20px 10px 0",
          }}
          onClick={() => navigate(-1)}
        >
          <MdChevronLeft />
        </Box>
        {data.map((item: DisplayItemProps, idx: number) => {
          const { url, date, thumbnail_url, media_type } = item;
          const image_url =
            media_type === MEDIA_TYPES.VIDEO ? thumbnail_url : url;

          return (
            <SlideshowThumbnail
              key={idx}
              image_url={image_url}
              date={date}
              media_type={media_type}
              highlight={displayItemDate.length > 0 && date === displayItemDate}
              onClick={() =>
                setDisplayItem(
                  data.find(({ date }: DisplayItemProps) => date === item.date)
                )
              }
            />
          );
        })}
        <Box
          cursor={historyIdx === 0 ? "not-allowed" : "pointer"}
          height="100%"
          fontSize="4xl"
          display="flex"
          alignItems={"center"}
          padding="10px"
          position="relative"
          transition={"padding 300ms"}
          color={historyIdx === 0 ? "#aaa" : "#000"}
          _hover={{
            padding: historyIdx === 0 ? "10px" : "10px 0 10px 20px",
          }}
          onClick={() => (historyIdx === 0 ? null : navigate(1))}
        >
          <MdChevronRight />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AstronomyPictureOfTheDay;
