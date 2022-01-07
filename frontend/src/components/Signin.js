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
import MetaTags from "react-meta-tags";

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
      <MetaTags>
        <title>RhodyRates - Sign In</title>
      </MetaTags>
      <Flex height="100vh" my="auto" pb={12} align="center" justify="center">
        <Stack align="center" spacing={2}>
          <Text color="gray.600">
            Need to create an account?{" "}
            <Link fontWeight="bold" as={RouterLink} to="/signup">
              Click here
            </Link>
          </Text>
          <Box
            rounded="lg"
            bg="white"
            maxW="350px"
            minW="300px"
            p={6}
            shadow="md"
          >
            <Center>
              <HStack mb={4} cursor="default">
                <Icon color="blue.500" fontSize={32} as={GiBigWave} />
                <Heading color="blue.800" size="lg">
                  RhodyRates
                </Heading>
              </HStack>
            </Center>
            <form onSubmit={onSubmit}>
              <Stack align="center" spacing={6}>
                <FormControl id="username" isRequired>
                  <FormLabel color="gray.500">Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    borderColor="gray.300"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="gray.500">Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    borderColor="gray.300"
                  />
                </FormControl>
                <Button
                  w={24}
                  variant="solid"
                  isLoading={loading}
                  spinner={<BeatLoader size={10} />}
                  type="submit"
                  bg="blue.800"
                  color="gray.200"
                  _hover={{ bg: "blue.700" }}
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
