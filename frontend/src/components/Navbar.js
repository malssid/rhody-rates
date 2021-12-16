import {
  Flex,
  Heading,
  Icon,
  HStack,
  useToast,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GiBigWave } from "react-icons/gi";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar({ onOpen }) {
  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  return isAuthenticated ? (
    <>
      <Flex px={6} pt={5} align="center" mb={4}>
        <HamburgerIcon
          cursor="pointer"
          color="gray.300"
          _hover={{ color: "gray.200" }}
          fontSize={28}
          onClick={onOpen}
        />
        <Spacer />
        <HStack cursor="default">
          <Icon color="blue.400" fontSize={32} as={GiBigWave} />
          <Heading color="#abd7ff" size="lg">
            RhodyRates
          </Heading>
        </HStack>
        <Spacer />
        <HamburgerIcon
          color="gray.300"
          fontSize={28}
          visibility="hidden"
        />
      </Flex>
    </>
  ) : null;
}
