import {
  Flex,
  Heading,
  Icon,
  HStack,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { GiBigWave } from "react-icons/gi";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar({ onOpen }) {
  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();

  return isAuthenticated ? (
    <>
      <Flex px={6} pt={5} align="center" mb={4}>
        <HamburgerIcon
          cursor="pointer"
          color="gray.700"
          _hover={{ color: "gray.600", transitionDuration: "0.2s" }}
          fontSize={28}
          onClick={onOpen}
        />
        <Spacer />
        <HStack cursor="default">
          <Icon color="blue.500" fontSize={32} as={GiBigWave} />
          <Heading color="blue.800" size="xl">
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
