import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  Select,
  HStack,
  Icon,
  Center,
} from "@chakra-ui/react";
import { GiBigWave } from "react-icons/gi";
import BeatLoader from "react-spinners/BeatLoader";
import Auth from "../utils/Auth";
import MetaTags from "react-meta-tags";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast({
        title: "Passwords must match",
        status: "error",
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    var { data, status } = await Auth.signUp({
      username,
      password,
      major,
      year,
    });
    if (status === 201) {
      setLoading(false);
      navigate("/signin");
    } else {
      toast({
        title: data.message,
        status: "error",
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const majors = [
    "Accounting",
    "Africana Studies",
    "Animal Science and Technology",
    "Anthropology",
    "Aquaculture and Fisheries Science",
    "Art",
    "Art History",
    "Biological Sciences",
    "Biology",
    "Biomedical Engineering",
    "Biotechnology",
    "Cell and Molecular Biology",
    "Chemical Engineering",
    "Chemistry and Forensic Chemistry",
    "Chemistry",
    "Chinese",
    "Chinese Language Flagship Program",
    "Civil Engineering",
    "Classical Studies",
    "Communication Studies",
    "Communicative Disorders",
    "Computer Engineering",
    "Computer Science",
    "Criminology and Criminal Justice",
    "Data Science",
    "Doctor of Pharmacy",
    "Early Childhood Education",
    "Economics",
    "Electrical Engineering",
    "Elementary Education",
    "English",
    "Environmental and Natural Resource Economics",
    "Environmental Science and Management",
    "Film Media",
    "Finance",
    "French",
    "Gender and Women’s Studies",
    "General Business Administration",
    "Geology and Geological Oceanography",
    "German",
    "Global Business Management",
    "Global Language and Area Studies",
    "Green Business Program",
    "Health and Physical Education",
    "Health Studies",
    "History",
    "Human Development and Family Science",
    "Industrial and Systems Engineering",
    "Innovation and Entrepreneurship",
    "Interdisciplinary Neuroscience",
    "International Business Program",
    "International Computer Science Program",
    "International Engineering Program",
    "International Studies and Diplomacy Program",
    "Italian",
    "Journalism",
    "Kinesiology",
    "Landscape Architecture",
    "Management",
    "Marine Affairs",
    "Marine Biology",
    "Marketing",
    "Mathematics",
    "Mechanical Engineering",
    "Medical Laboratory Science",
    "Music",
    "Nonprofit Administration",
    "Nursing",
    "Nutrition and Dietetics",
    "Ocean Engineering",
    "Pharmaceutical Sciences",
    "Philosophy",
    "Physics and Physical Oceanography",
    "Physics",
    "Plant Sciences",
    "Political Science",
    "Professional Leadership Studies",
    "Psychology",
    "Public Relations",
    "Secondary Education",
    "Sociology",
    "Spanish",
    "Sports Media and Communication",
    "Supply Chain Management",
    "Sustainable Agriculture and Food Systems",
    "Textile Marketing",
    "Textiles, Fashion Merchandising, and Design",
    "Theatre",
    "Wildlife and Conservation Biology",
    "Writing and Rhetoric",
  ];

  return (
    <>
      <MetaTags>
        <title>RhodyRates - Sign Up</title>
      </MetaTags>
      <Flex
        height="100vh"
        my={[6, "auto"]}
        pb={12}
        align="center"
        justify="center"
      >
        <Stack align="center" spacing={[2, 4]}>
          <Text color="gray.600">
            Already have an account?{" "}
            <Link fontWeight="bold" as={RouterLink} to="/signin">
              Click here
            </Link>
          </Text>
          <Box
            rounded="lg"
            bg="white"
            shadow="md"
            maxW="350px"
            minW="300px"
            p={6}
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
                <FormControl id="confirmpassword" isRequired>
                  <FormLabel color="gray.500">Confirm Password</FormLabel>
                  <Input
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    borderColor="gray.300"
                  />
                </FormControl>
                <FormControl id="major" isRequired>
                  <FormLabel color="gray.500">Select Major</FormLabel>
                  <Select
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    borderColor="gray.300"
                  >
                    {majors.map((major) => {
                      return <option value={major}>{major}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl id="year" isRequired>
                  <FormLabel color="gray.500">Select Year</FormLabel>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    borderColor="gray.300"
                  >
                    <option value="Freshman">Freshman</option>

                    <option value="Sophomore">Sophomore</option>

                    <option value="Junior">Junior</option>

                    <option value="Senior">Senior</option>

                    <option value="Senior+">Senior+</option>
                  </Select>
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
                  {loading || "Sign Up"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
