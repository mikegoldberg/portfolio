import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import Menu from "./menu";
import MobileHeading from "./mobile-heading";

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display={["block", "block", "none"]}>
        <MobileHeading onOpen={onOpen} />
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            overflow="hidden"
            background={useColorModeValue("brand.lightBlue", "brand.blue")}
          >
            <DrawerCloseButton zIndex={200} />
            <DrawerBody>
              <Menu onNavClicked={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box
        display={["none", "none", "block"]}
        width={["280px", "280px", "280px", "350px", "350px"]}
        position="relative"
        _before={{
          background: useColorModeValue("brand.lightBlue", "brand.blue"),
          content: "' '",
          position: "fixed",
          top: 0,
          bottom: 0,
          width: ["280px", "280px", "280px", "350px", "350px"],
        }}
      >
        <Menu />
      </Box>
    </>
  );
};

export default Navigation;
