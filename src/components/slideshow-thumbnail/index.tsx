import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { MdPlayCircleOutline } from "react-icons/md";
import { useImageLoaded } from "../../hooks";
import { SlideshowThumbnailProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const SlideshowThumbnail = ({
  image_url,
  date,
  media_type,
  highlight,
  onClick,
}: SlideshowThumbnailProps) => {
  const { imageLoaded } = useImageLoaded({ url: image_url });

  return (
    <Skeleton isLoaded={imageLoaded} flex={1}>
      <Flex
        data-testid={TEST_DRIVERS.THUMBNAIL}
        width={["100%"]}
        flex="1"
        height={"100%"}
        backgroundImage={image_url}
        backgroundSize={"cover"}
        alignItems="flex-end"
        transition={"box-shadow 300ms ease-in-out"}
        position="relative"
        boxShadow={
          highlight
            ? "0 0 0 10px inset rgba(255, 255, 255, 0.2)"
            : "0 0 0 0 inset rgba(255, 255, 255, 0.2)"
        }
        cursor={"pointer"}
        onClick={onClick}
        _hover={{
          boxShadow: highlight
            ? ""
            : "0 0 0 15px inset rgba(255, 255, 255, 0.2)",
        }}
        backgroundColor="#000"
      >
        {media_type === "video" ? (
          <Flex
            fontSize="5xl"
            color="rgba(255, 255, 255, 0.7)"
            position="absolute"
            top="25px"
            width="100%"
            justifyContent="center"
            data-testid={TEST_DRIVERS.PLAY_ICON}
          >
            <MdPlayCircleOutline />
          </Flex>
        ) : null}
        <Text
          background="rgba(0, 0, 0, 0.3)"
          color="#ededed"
          padding="4px 6px"
          data-testid={TEST_DRIVERS.DATE}
        >
          {date}
        </Text>
      </Flex>
    </Skeleton>
  );
};

export default SlideshowThumbnail;
