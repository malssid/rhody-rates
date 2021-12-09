import {
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  Input,
  Kbd,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Student from "../utils/Student";
import { useQuery } from "react-query";
import { useRef } from "react";

export default function Header({ setKeyword }) {
  const { isLoading, error, data } = useQuery("profile", Student.getProfile);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
      onClose();
    }
  };

  const handleReset = () => {
    setKeyword("");
    onClose();
  };

  return (
    <>
      <Button mt={4} mb={2} bg="gray.300" onClick={onOpen}>
        Options
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerCloseButton
            color="gray.300"
            _hover={{ bg: "gray.800" }}
          />
          <DrawerHeader color="gray.200" fontWeight="medium">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack mb={12} textAlign="center">
              <Heading color="gray.200" fontWeight="600" size="lg">
                Search
              </Heading>
              <Input
                w={{ sm: 60, md: "100%" }}
                bg="gray.900"
                color="white"
                borderColor="gray.600"
                _hover={{ borderColor: "gray.600" }}
                _focus={{ borderColor: "gray.600", bg: "gray.800" }}
                onKeyPress={handleSearch}
              />
              <Text color="gray.300">
                Press <Kbd color="gray.800">enter</Kbd> to filter results by
                keyword
              </Text>
              <Button bg="gray.300" onClick={handleReset}>
                Reset
              </Button>
            </VStack>
            <VStack textAlign="center">
              <Heading color="gray.200" fontWeight="600" size="lg">
                Profile
              </Heading>
              <Text color="gray.400">
                <Box color="gray.300" as="span" fontWeight="500">
                  Username:
                </Box>{" "}
                {data?.username}
              </Text>
              <Text color="gray.400">
                <Box color="gray.300" as="span" fontWeight="500">
                  Year:
                </Box>{" "}
                {data?.year}
              </Text>
              <Text color="gray.400">
                <Box color="gray.300" as="span" fontWeight="500">
                  Major:
                </Box>{" "}
                {data?.major}
              </Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
