import {
  Flex,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

export default function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        color="#000"
        aria-label={"check"}
        icon={<MdCheck />}
        {...getSubmitButtonProps()}
        backgroundColor="rgba(0, 0, 0, 0.1)"
        _hover={{ background: "rgba(0, 0, 0, 0.2)" }}
        _selected={{ backgroundColor: "#000", color: "#fff" }}
        _active={{ backgroundColor: "#000", color: "#fff" }}
      />
      <IconButton
        color="#000"
        aria-label={"close"}
        icon={<MdClose />}
        {...getCancelButtonProps()}
        backgroundColor="rgba(0, 0, 0, 0.1)"
        _hover={{ background: "rgba(0, 0, 0, 0.2)" }}
        _selected={{ backgroundColor: "#000", color: "#fff" }}
        _active={{ backgroundColor: "#000", color: "#fff" }}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        color="#000"
        aria-label={"edit"}
        size="sm"
        icon={<MdEdit />}
        {...getEditButtonProps()}
        backgroundColor="rgba(0, 0, 0, 0.1)"
        _hover={{ background: "rgba(0, 0, 0, 0.2)" }}
        _selected={{ backgroundColor: "#000", color: "#fff" }}
        _active={{ backgroundColor: "#000", color: "#fff" }}
      />
    </Flex>
  );
}
