import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import Student from "../utils/Student";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import Course from "../utils/Course";

export default function CourseCard({
  id,
  subject,
  catalog,
  desc,
  title,
  formalSubject,
  college,
  minCredits,
  maxCredits,
  likes,
  dislikes,
  liked,
  disliked,
  refetchCourses,
  refetchRatings,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Modal
        size="lg"
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="gray.200">
          <ModalHeader textAlign="center" fontSize="35px">
            {subject} {catalog}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={2} textAlign="center">
              <Text color="gray.800">
                <Box color="black" as="span" fontWeight="500">
                  Subject:
                </Box>{" "}
                {formalSubject}
              </Text>
              <Text color="gray.800">
                <Box color="black" as="span" fontWeight="500">
                  College:
                </Box>{" "}
                {college}
              </Text>
              <Text color="gray.800">
                <Box color="black" as="span" fontWeight="500">
                  Description:
                </Box>{" "}
                {desc}
              </Text>
              <Text color="gray.800">
                <Box color="black" as="span" fontWeight="500">
                  Min Credits:
                </Box>{" "}
                {minCredits}
              </Text>
              <Text color="gray.800">
                <Box color="black" as="span" fontWeight="500">
                  Max Credits:
                </Box>{" "}
                {maxCredits}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        borderRadius="md"
        textAlign="center"
        bg="gray.200"
        w={["300px", "400px"]}
        h="170px"
        p={4}
      >
        <Flex justifyContent="space-between">
          <HStack>
            <Icon
              cursor="pointer"
              as={ImArrowUp}
              color={liked ? "#1da840" : "gray.600"}
              _hover={{ color: "gray.700", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleLike}
            />
            <Text color="gray.700" fontWeight="medium">
              {likes}
            </Text>
          </HStack>
          <HStack>
            <Text color="gray.700" fontWeight="medium">
              {dislikes}
            </Text>
            <Icon
              cursor="pointer"
              as={ImArrowDown}
              color={disliked ? "#b80003" : "gray.600"}
              _hover={{ color: "gray.700", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleDislike}
            />
          </HStack>
        </Flex>
        <Icon
          as={InfoIcon}
          _hover={{ color: "gray.700", transitionDuration: "0.2s" }}
          color="gray.600"
          cursor="pointer"
          fontSize="25px"
          onClick={onOpen}
        />
        <Flex justify="center" align="center" direction="column">
          <Heading color="black">
            {subject} {catalog}
          </Heading>
          <Text color="gray.800">{title}</Text>
        </Flex>
      </Box>
    </>
  );
}
