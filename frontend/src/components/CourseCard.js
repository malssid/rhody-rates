import { Box, Flex, Heading, Text, Icon, Spacer } from "@chakra-ui/react";
import Course from "../utils/Course";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

export default function CourseCard({
  subject,
  catalog,
  title,
  liked,
  disliked,
}) {
  return (
    <>
      <Box
        borderRadius="md"
        textAlign="center"
        bg="gray.800"
        w={["300px", "400px"]}
        h="150px"
        p={4}
      >
        <Flex justifyContent="space-between">
          <Icon
            cursor="pointer"
            as={ImArrowUp}
            color={liked ? "#1da840" : "gray.400"}
            _hover={{ color: "gray.500", transitionDuration: "0.2s" }}
            fontSize="20px"
          />
          <Icon
            cursor="pointer"
            as={ImArrowDown}
            color={disliked ? "#b80003" : "gray.400"}
            _hover={{ color: "gray.500", transitionDuration: "0.2s" }}
            fontSize="20px"
          />
        </Flex>
        <Flex justify="center" align="center" direction="column">
          <Heading color="gray.200">
            {subject} {catalog}
          </Heading>
          <Text color="gray.400">{title}</Text>
        </Flex>
      </Box>
    </>
  );
}
