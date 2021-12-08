import {
  Flex,
  Heading,
  Icon,
  HStack,
  useToast,
  Button,
  Spacer
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
      <Flex px={6} pt={5} align="center">
        <HStack cursor="default">
          <Icon color="blue.400" fontSize={32} as={GiBigWave} />
          <Heading color="#abd7ff" size="lg">
            RhodyRates
          </Heading>
        </HStack>
        <Spacer />
        <Button
          bg="gray.300"
          color="gray.800"
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
