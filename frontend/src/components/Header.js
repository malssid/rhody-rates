import { Flex, Heading, Text, VStack, Box, Input } from "@chakra-ui/react";
import Student from "../utils/Student";
import { useQuery } from "react-query";

export default function Header({ setKeyword }) {
  const { isLoading, error, data } = useQuery("profile", Student.getProfile, {
    refetchOnWindowFocus: false,
  });

  return (
    <Flex
      bg="gray.400"
      color="gray.900"
      mt={6}
      w="80%"
      mx={10}
      direction={["column", "row"]}
      justifyContent={{ sm: "center", md: "space-around" }}
      py={4}
      borderRadius="md"
      shadow="lg"
    >
      <VStack mb={{ sm: 6, md: 0 }}>
        <Heading fontWeight="600" size="lg">
          Search
        </Heading>
        <Input
          w={{ sm: 60, md: "100%" }}
          bg="gray.200"
          color="gray.900"
          borderColor="gray.500"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "gray.500", bg: "gray.100" }}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </VStack>
      <VStack>
        <Heading fontWeight="600" size="lg">
          Profile
        </Heading>
        <Text>
          <Box as="span" fontWeight="500">
            Username:
          </Box>{" "}
          {data?.username}
        </Text>
        <Text>
          <Box as="span" fontWeight="500">
            Year:
          </Box>{" "}
          {data?.year}
        </Text>
        <Text>
          <Box as="span" fontWeight="500">
            Major:
          </Box>{" "}
          {data?.major}
        </Text>
      </VStack>
    </Flex>
  );
}
