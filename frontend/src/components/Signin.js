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
            sx={{
              background: "rgba( 43, 43, 95, 0.58 )",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
            }}
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
                  <FormLabel color="gray.50">Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    bg="gray.400"
                    color="black"
                    border="none"
                    _focus={{ bg: "gray.300", boxShadow:"xl" }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="gray.50">Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    bg="gray.400"
                    color="black"
                    border="none"
                    _focus={{ bg: "gray.300", boxShadow:"xl" }}
                  />
                </FormControl>
                <Button
                  w={24}
                  variant="solid"
                  isLoading={loading}
                  spinner={<BeatLoader size={10} />}
                  bg="blue.200"
                  color="gray.800"
                  boxShadow="xl"
                  _hover={{bg:"blue.100"}}
                  type="submit"
                  _focus={{ border:"none" }}
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
