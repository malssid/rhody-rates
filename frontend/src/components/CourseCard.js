import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Course from "../utils/Course";

export default function CourseCard({ subject, catalog, title }) {
  return (
    <Flex
      borderRadius="md"
      justify="center"
      align="center"
      textAlign="center"
      bg="gray.700"
      w="400px"
      h="150px"
      p={4}
      direction="column"
    >
      <Heading color="gray.200">
        {subject} {catalog}
      </Heading>
      <Text color="gray.400">{title}</Text>
    </Flex>
  );
}
