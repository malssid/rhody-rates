import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Student from "../utils/Student";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

export default function CourseCard({
  id,
  subject,
  catalog,
  title,
  likes,
  dislikes,
  liked,
  disliked,
  refetchCourses,
  refetchRatings,
}) {
  const toast = useToast();

  const handleLike = async () => {
    const { data, status } = await Student.rate(id, "like");
    if (status === 200) {
      toast({
        title: data.message,
        status: "success",
        isClosable: true,
        position: "top",
      });
      refetchRatings();
      refetchCourses();
    } else {
      toast({
        title: data.message,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDislike = async () => {
    const { data, status } = await Student.rate(id, "dislike");
    if (status === 200) {
      toast({
        title: data.message,
        status: "success",
        isClosable: true,
        position: "top",
      });
      refetchRatings();
      refetchCourses();
    } else {
      toast({
        title: data.message,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

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
          <HStack>
            <Icon
              cursor="pointer"
              as={ImArrowUp}
              color={liked ? "#1da840" : "gray.400"}
              _hover={{ color: "gray.500", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleLike}
            />
            <Text color="gray.200">{likes}</Text>
          </HStack>
          <HStack>
            <Text color="gray.200">{dislikes}</Text>
            <Icon
              cursor="pointer"
              as={ImArrowDown}
              color={disliked ? "#b80003" : "gray.400"}
              _hover={{ color: "gray.500", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleDislike}
            />
          </HStack>
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
