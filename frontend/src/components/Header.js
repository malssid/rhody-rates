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
  Select,
} from "@chakra-ui/react";
import Student from "../utils/Student";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Auth from "../utils/Auth";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ setKeyword, setSort, sort }) {
  const { isLoading, error, data } = useQuery("profile", Student.getProfile);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
      onClose();
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    onClose();
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
        <DrawerContent bg="gray.100" borderRightRadius="xl">
          <DrawerCloseButton
            color="gray.700"
            _hover={{ color: "gray.600", transitionDuration: "0.2s" }}
          />
          <DrawerBody mt={6}>
            <VStack mb={12} textAlign="center">
              <Heading color="gray.800" fontWeight="600" size="lg">
                Search
              </Heading>
              <Input
                onKeyPress={handleSearch}
                borderColor="gray.400"
              />
              <Text color="gray.700">
                Press{" "}
                <Kbd color="black" bg="gray.50">
                  enter
                </Kbd>{" "}
                to filter results by keyword
              </Text>
              <Button
                onClick={handleReset}
                bg="blue.800"
                _hover={{ bg: "blue.700" }}
                color="gray.200"
              >
                Reset
              </Button>
            </VStack>
            <VStack mb={12} textAlign="center">
              <Heading color="gray.800" fontWeight="600" size="lg">
                Sort
              </Heading>
              <Select
                onChange={handleSort}
                borderColor="gray.400"
                value={sort}
              >
                <option value=""></option>
                <option value="likes">Likes</option>
                <option value="dislikes">Dislikes</option>
              </Select>
              <Text color="gray.700">
                Sort by likes or dislikes (descending). Default option sorts by
                course ID.
              </Text>
            </VStack>
            <VStack textAlign="center">
              <Heading color="gray.800" fontWeight="600" size="lg">
                Profile
              </Heading>
              <Text color="gray.600">
                <Box color="gray.700" as="span" fontWeight="500">
                  Username:
                </Box>{" "}
                {data?.username}
              </Text>
              <Text color="gray.600">
                <Box color="gray.700" as="span" fontWeight="500">
                  Year:
                </Box>{" "}
                {data?.year}
              </Text>
              <Text color="gray.600">
                <Box color="gray.700" as="span" fontWeight="500">
                  Major:
                </Box>{" "}
                {data?.major}
              </Text>
              <Button
                _focus={{ border: "none" }}
                onClick={handleSignOut}
                bg="blue.800"
                color="gray.200"
                _hover={{ bg: "blue.700" }}
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
