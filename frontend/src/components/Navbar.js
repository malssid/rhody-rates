import {
  Flex,
  Heading,
  Icon,
  HStack,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { GiBigWave } from "react-icons/gi";

export default function Navbar() {
  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

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
  return isAuthenticated ? (
    <>
      <Flex px={10} pt={5} justify="space-between" align="center">
        <HStack>
          <Icon color="blue.400" fontSize={32} as={GiBigWave} />
          <Heading color="#abd7ff" size="lg">
            RhodyRates
          </Heading>
        </HStack>
        <Button
          bg="gray.400"
          color="gray.900"
          size="sm"
          _hover={{ bg: "gray.200" }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Flex>
    </>
  ) : null;
}
