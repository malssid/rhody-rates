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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import Student from "../utils/Student";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

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
        returnFocusOnClose
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          sx={{
            background: "rgba( 206, 206, 255, 0.3 )",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <ModalHeader color="white" textAlign="center" fontSize="35px">
            {subject} {catalog}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={2} textAlign="center">
              <Text color="gray.100">
                <Box color="white" as="span" fontWeight="500">
                  Subject:
                </Box>{" "}
                {formalSubject}
              </Text>
              <Text color="gray.200">
                <Box color="white" as="span" fontWeight="500">
                  College:
                </Box>{" "}
                {college}
              </Text>
              <Text color="gray.200">
                <Box color="white" as="span" fontWeight="500">
                  Description:
                </Box>{" "}
                {desc}
              </Text>
              {minCredits !== maxCredits ? (
                <>
                  <Text color="gray.200">
                    <Box color="white" as="span" fontWeight="500">
                      Min Credits:
                    </Box>{" "}
                    {minCredits}
                  </Text>
                  <Text color="gray.200">
                    <Box color="white" as="span" fontWeight="500">
                      Max Credits:
                    </Box>{" "}
                    {maxCredits}
                  </Text>
                </>
              ) : (
                <Text color="gray.200">
                  <Box color="white" as="span" fontWeight="500">
                    Credits:
                  </Box>{" "}
                  {maxCredits}
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        sx={{
          background: "rgba( 86, 86, 150, 0.65 )",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
          backdropFilter: "blur(4px)",
        }}
        borderRadius="md"
        textAlign="center"
        w={["300px", "400px"]}
        h="170px"
        p={4}
        m={2}
      >
        <Flex justifyContent="space-between">
          <HStack>
            <Icon
              cursor="pointer"
              as={ImArrowUp}
              color={liked ? "#1da840" : "gray.500"}
              _hover={{ color: "gray.600", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleLike}
            />
            <Text color="gray.100" fontWeight="medium">
              {likes}
            </Text>
          </HStack>
          <HStack>
            <Text color="gray.100" fontWeight="medium">
              {dislikes}
            </Text>
            <Icon
              cursor="pointer"
              as={ImArrowDown}
              color={disliked ? "#b80003" : "gray.500"}
              _hover={{ color: "gray.600", transitionDuration: "0.2s" }}
              fontSize="20px"
              onClick={handleDislike}
            />
          </HStack>
        </Flex>
        <Icon
          as={InfoIcon}
          _hover={{ color: "gray.700", transitionDuration: "0.2s" }}
          color="gray.200"
          cursor="pointer"
          fontSize="25px"
          onClick={onOpen}
        />
        <Flex justify="center" align="center" direction="column">
          <Heading color="white">
            {subject} {catalog}
          </Heading>
          <Text color="gray.100">{title}</Text>
        </Flex>
      </Box>
    </>
  );
}
