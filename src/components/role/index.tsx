import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Tag,
  TagLabel,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import moment from "moment";
import Moment from "react-moment";
import { formatDuration } from "../../helpers";
import { RoleProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const Role = ({
  title = "",
  company = "",
  description = "",
  achievements = [],
  skillset = [],
  start = "",
  end = "",
}: RoleProps) => {
  const startMoment = moment(start);
  const endMoment = moment(end);
  const duration = endMoment.diff(startMoment, "months");
  const colors = {
    title: useColorModeValue("blackAlpha.900", "whiteAlpha.900"),
    company: useColorModeValue("blackAlpha.900", "whiteAlpha.900"),
    description: useColorModeValue("blackAlpha.700", "whiteAlpha.700"),
    period: useColorModeValue("blackAlpha.700", "whiteAlpha.700"),
    tag: {
      background: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      color: useColorModeValue("blackAlpha.700", "whiteAlpha.700"),
    },
  };

  return (
    <Box padding="20px 0">
      <Flex marginBottom="2px" alignItems={"flex-end"}>
        <Text fontWeight="700" fontSize="xl" data-testid={TEST_DRIVERS.TITLE}>
          {title}
        </Text>
        {/* {contract && (
          <Text
            paddingLeft="10px"
            fontStyle="italic"
            fontWeight="500"
            fontSize="lg"
          >
            {"Contract"}
          </Text>
        )} */}
      </Flex>
      <Flex
        direction={["column", "row"]}
        color={colors.company}
        gap="10px"
        alignItems={["start", "end"]}
      >
        <Text fontWeight={500} fontSize="lg" data-testid={TEST_DRIVERS.COMPANY}>
          {company}
        </Text>
        <Flex gap="5px" color={colors.period} whiteSpace="nowrap">
          <Moment format="MMM YYYY" data-testid={TEST_DRIVERS.START}>
            {start}
          </Moment>
          <Text>-</Text>
          <Moment format="MMM YYYY" data-testid={TEST_DRIVERS.END}>
            {end}
          </Moment>
          <Text>{formatDuration(duration)}</Text>
        </Flex>
      </Flex>
      <Text
        padding="10px 0"
        color={colors.description}
        data-testid={TEST_DRIVERS.DESCRIPTION}
      >
        {description}
      </Text>
      <UnorderedList
        paddingBottom="10px"
        data-testid={TEST_DRIVERS.ACHIEVEMENTS}
      >
        {achievements.map((achievement, idx) => (
          <ListItem key={idx} fontStyle={"italic"}>
            {achievement}
          </ListItem>
        ))}
      </UnorderedList>
      <Box padding="10px 0" data-testid={TEST_DRIVERS.SKILLSET}>
        {skillset.map((tag) => (
          <Tag
            key={tag}
            size="md"
            margin="0 8px 8px 0"
            backgroundColor={colors.tag.background}
          >
            <TagLabel color={colors.tag.color}>{tag}</TagLabel>
          </Tag>
        ))}
      </Box>
    </Box>
  );
};

export default Role;
