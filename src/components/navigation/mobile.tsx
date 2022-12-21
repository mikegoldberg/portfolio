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

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
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
  );
};

export default MobileMenu;
