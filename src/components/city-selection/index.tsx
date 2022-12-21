import {
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
} from "@chakra-ui/react";
import EditableControls from "./editable-controls";
import { CitySelectionProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const CitySelection = ({ city, onSubmit }: CitySelectionProps) => {
  return (
    <Editable
      defaultValue={city}
      fontSize="3xl"
      isPreviewFocusable={false}
      onSubmit={onSubmit}
    >
      <Flex alignItems={"center"} gap="10px">
        <Heading as="h2" height="50px" data-testid={TEST_DRIVERS.HEADING}>
          <EditablePreview />
        </Heading>
        <EditableInput
          fontSize="lg"
          padding="5px 10px"
          maxWidth="200px"
          color="#000"
        />
        <EditableControls />
      </Flex>
    </Editable>
  );
};

export default CitySelection;
