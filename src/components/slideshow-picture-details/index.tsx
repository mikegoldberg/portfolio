import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdInfo, MdPhoto } from "react-icons/md";
import { useImageLoaded } from "../../hooks";
import { SlideshowPictureDetailsProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const SlideshowPictureDetails = ({
  url,
  imageUrl,
  title,
  explanation,
  copyright,
  mediaType,
}: SlideshowPictureDetailsProps) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { imageLoaded } = useImageLoaded({ url: imageUrl });

  useEffect(() => {
    setShowExplanation(false);
  }, [imageUrl]);

  return (
    <Box width="100%" paddingTop="56.25%" position={"relative"}>
      <>
        {imageLoaded === false ? (
          <Flex
            position={"absolute"}
            width="100%"
            height="100%"
            justifyContent={"center"}
            alignItems="center"
            top="0"
          >
            <Spinner size={"xl"} />
          </Flex>
        ) : mediaType === "video" ? (
          <Box position="absolute" top="0" width="100%" height="100%">
            <iframe
              data-testid={TEST_DRIVERS.VIDEO}
              title="vimeo-player"
              src={url}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        ) : (
          <Box
            data-testid={TEST_DRIVERS.IMAGE}
            backgroundImage={imageUrl}
            backgroundPosition="center left"
            backgroundSize="cover"
            position="absolute"
            top="0"
            width="100%"
            height="100%"
          >
            {showExplanation ? (
              <Box
                position="absolute"
                top="0"
                left="0"
                bottom="0"
                padding="40px"
                background="rgba(0, 0, 0, 0.8)"
                color="#efefef"
              >
                <Text data-testid={TEST_DRIVERS.EXPLANATION}>
                  {explanation}
                </Text>
              </Box>
            ) : (
              <>
                <Text
                  fontSize="2xl"
                  position="absolute"
                  width="100%"
                  top="0"
                  color="#ddd"
                  padding="15px 20px 12px"
                  background="rgba(0, 0, 0, 0.5)"
                  fontWeight="500"
                  data-testid={TEST_DRIVERS.TITLE}
                >
                  {title}
                </Text>
                {copyright ? (
                  <Text
                    fontSize="sm"
                    position="absolute"
                    bottom="0"
                    right="0"
                    color="#ddd"
                    padding="10px 20px"
                    fontStyle={"italic"}
                    data-testid={TEST_DRIVERS.COPYRIGHT}
                  >
                    {copyright}
                  </Text>
                ) : null}
              </>
            )}
            <Box
              alignItems={"center"}
              cursor="pointer"
              color={showExplanation ? "#ddd" : "#ddd"}
              position="absolute"
              bottom="0"
              left="0"
              fontSize="4xl"
              padding="10px"
              zIndex={100}
              onClick={() => {
                setShowExplanation(!showExplanation);
              }}
              background="rgba(0, 0, 0, 0.4)"
              data-testid={TEST_DRIVERS.MORE_INFO_ICON}
            >
              {showExplanation ? <MdPhoto /> : <MdInfo />}
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default SlideshowPictureDetails;
