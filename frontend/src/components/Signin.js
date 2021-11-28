import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Auth from "../utils/Auth";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Input,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Heading,
  useToast,
  Stack,
  Text,
  Link,
  Icon,
  HStack,
  Center,
} from "@chakra-ui/react";
import { GiBigWave } from "react-icons/gi";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAuthenticated } = useAuth();
  const toast = useToast();
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const data = await Auth.signIn({ username, password });
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        toast({
          title: "Successfully signed in",
          status: "success",
          isClosable: true,
          position: "top",
        });
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Invalid credentials",
        status: "error",
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Flex height="100vh" my="auto" pb={12} align="center" justify="center">
        <Stack align="center" spacing={4}>
          <Text color="gray.300">
            Need to create an account?{" "}
            <Link fontWeight="bold" as={RouterLink} to="/signup">
              Click here
            </Link>
          </Text>
          <Box
            rounded="lg"
            bg="gray.900"
            shadow="lg"
            maxW="350px"
            minW="300px"
            p={6}
          >
            <Center>
              <HStack mb={4} cursor="default">
                <Icon color="blue.400" fontSize={32} as={GiBigWave} />
                <Heading color="#abd7ff" size="lg">
                  RhodyRates
                </Heading>
              </HStack>
            </Center>
            <form onSubmit={onSubmit}>
              <Stack align="center" spacing={6}>
                <FormControl id="username" isRequired>
                  <FormLabel color="gray.300">Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    bg="gray.900"
                    color="white"
                    borderColor="gray.600"
                    _hover={{ borderColor: "gray.600" }}
                    _focus={{ borderColor: "gray.600", bg:"gray.800" }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="gray.300">Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    bg="gray.900"
                    color="white"
                    borderColor="gray.600"
                    _hover={{ borderColor: "gray.600" }}
                    _focus={{ borderColor: "gray.600", bg:"gray.800" }}
                  />
                </FormControl>
                <Button
                  w={24}
                  variant="solid"
                  isLoading={loading}
                  spinner={<BeatLoader size={10} />}
                  bg="blue.700"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  type="submit"
                >
                  {loading || "Sign In"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
