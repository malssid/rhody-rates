import {
  Heading,
  Text,
  VStack,
  Box,
  Input,
  Kbd,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import Student from "../utils/Student";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Auth from "../utils/Auth";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ setKeyword }) {
  const { isLoading, error, data } = useQuery("profile", Student.getProfile);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    const data = await Auth.signOut();
    if (data.success) {
      setUser(data.user);
      setIsAuthenticated(false);
      toast({
        title: "Successfully Logged Out",
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
  };

  return (
    <>
      <Navbar onOpen={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent
          sx={{
            background: "rgba( 188, 188, 221, 0.32 )",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.02)",
            backdropFilter: "blur(8px)",
          }}
          borderRightRadius="xl"
        >
          <DrawerCloseButton color="gray.300" _hover={{ color: "gray.200" }} />
          <DrawerBody mt={6}>
            <VStack mb={12} textAlign="center">
              <Heading color="white" fontWeight="600" size="lg">
                Search
              </Heading>
              <Input
                w={{ sm: 60, md: "100%" }}
                bg="gray.400"
                color="black"
                border="none"
                _focus={{ bg: "gray.300", boxShadow: "xl" }}
                onKeyPress={handleSearch}
              />
              <Text color="gray.100">
                Press <Kbd color="black">enter</Kbd> to filter results by
                keyword
              </Text>
              <Button
                _focus={{ border: "none" }}
                bg="gray.300"
                onClick={handleReset}
                color="gray.800"
                boxShadow="xl"
                _hover={{ bg: "gray.200" }}
              >
                Reset
              </Button>
            </VStack>
            <VStack textAlign="center">
              <Heading color="white" fontWeight="600" size="lg">
                Profile
              </Heading>
              <Text color="gray.100">
                <Box color="gray.50" as="span" fontWeight="500">
                  Username:
                </Box>{" "}
                {data?.username}
              </Text>
              <Text color="gray.100">
                <Box color="gray.50" as="span" fontWeight="500">
                  Year:
                </Box>{" "}
                {data?.year}
              </Text>
              <Text color="gray.100">
                <Box color="gray.50" as="span" fontWeight="500">
                  Major:
                </Box>{" "}
                {data?.major}
              </Text>
              <Button
                _focus={{ border: "none" }}
                bg="gray.300"
                onClick={handleSignOut}
                color="gray.800"
                boxShadow="xl"
                _hover={{ bg: "gray.200" }}
              >
                Sign Out
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
