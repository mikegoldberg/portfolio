import { Box, Text, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Role } from "../../components";
import roles from "./roles.json";
import { RoleProps } from "../../components/role/types";

const Resume = () => {
  const summaryTextColor = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.700"
  );

  const highlightTextColor = useColorModeValue(
    "blackAlpha.800",
    "whiteAlpha.800"
  );

  return (
    <Flex
      justifyContent={"flex-start"}
      padding={[
        "100px 30px",
        "100px 30px",
        "100px 60px",
        "80px 90px",
        "80px 90px",
      ]}
      alignItems={"flex-start"}
    >
      <Box>
        <Heading as={"h2"}>{"Summary"}</Heading>
        <Text margin="20px 0 60px" color={summaryTextColor}>
          Full-stack developer with experience working for companies such as{" "}
          <Text as="b" color={highlightTextColor}>
            ServiceNow
          </Text>
          ,{" "}
          <Text as="b" color={highlightTextColor}>
            Gogo
          </Text>
          ,{" "}
          <Text as="b" color={highlightTextColor}>
            Samsung
          </Text>
          , and{" "}
          <Text as="b" color={highlightTextColor}>
            The Daily
          </Text>
          . I've worked on a variety of projects individually or with teams to
          build websites, web apps, and prototypes.
        </Text>
        <Heading as={"h2"}>{"History"}</Heading>
        {roles.map((role: RoleProps, idx: React.Key) => {
          const {
            title,
            company,
            achievements,
            skillset,
            description,
            start,
            end,
          } = role;

          return (
            <Role
              key={idx}
              title={title}
              company={company}
              skillset={skillset}
              description={description}
              start={start}
              achievements={achievements}
              end={end}
            />
          );
        })}
      </Box>
    </Flex>
  );
};

export default Resume;
