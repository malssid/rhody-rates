import { useInfiniteQuery, useQuery } from "react-query";
import Course from "../utils/Course";
import Student from "../utils/Student";
import {
  Flex,
  Heading,
  Box,
  Wrap,
  WrapItem,
  Button,
  VStack,
  Input,
  Text,
  Kbd,
  Select,
  Divider,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import CourseCard from "./CourseCard";
import Navbar from "./Navbar";
import { useState } from "react";
import Loading from "./Loading";
import MetaTags from "react-meta-tags";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const { setIsAuthenticated, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleReset = () => {
    setKeyword("");
  };

  const handleSignOut = async () => {
    const data = await Auth.signOut();
    if (data.success) {
      setUser(data.user);
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  const { data: studentData } = useQuery("profile", Student.getProfile);

  const {
    isLoading: isLoadingRatings,
    data: ratingsData,
    refetch: refetchRatings,
  } = useQuery("ratings", Student.getRatings);

  const {
    data: courseData,
    isLoading: isLoadingCourses,
    hasNextPage,
    fetchNextPage,
    refetch: refetchCourses,
  } = useInfiniteQuery(
    ["courses", keyword, sort],
    ({ pageParam = 1 }) => Course.getCourses(pageParam, keyword, sort),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

  return (
    <>
      <MetaTags>
        <title>RhodyRates - Home</title>
      </MetaTags>
      {isLoadingCourses || isLoadingRatings ? (
        <Loading />
      ) : (
        <>
          <Navbar setKeyword={setKeyword} setSort={setSort} sort={sort} />
          <Flex direction="row">
            <Flex
              ml={4}
              px={2}
              minW="25%"
              display={{ base: "none", md: "flex" }}
              direction="column"
            >
              <VStack mb={12} textAlign="center">
                <Heading color="gray.800" fontWeight="600" size="lg">
                  Search
                </Heading>
                <Input
                  w="80%"
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
                  w="80%"
                >
                  <option value=""></option>
                  <option value="likes">Likes</option>
                  <option value="dislikes">Dislikes</option>
                </Select>
                <Text color="gray.700">
                  Sort by likes or dislikes (descending). Default option sorts
                  by course ID.
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
                  {studentData?.username}
                </Text>
                <Text color="gray.600">
                  <Box color="gray.700" as="span" fontWeight="500">
                    Year:
                  </Box>{" "}
                  {studentData?.year}
                </Text>
                <Text color="gray.600">
                  <Box color="gray.700" as="span" fontWeight="500">
                    Major:
                  </Box>{" "}
                  {studentData?.major}
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
            </Flex>
            <Box h="91vh" overflowY="overlay" overflowX="hidden">
              <InfiniteScroll
                hasMore={hasNextPage}
                loadMore={fetchNextPage}
                useWindow={false}
              >
                <Wrap justify="center" mr={{ base: 0, md: 4 }}>
                  {courseData?.pages.map((page) =>
                    page.results.map((course) => (
                      <WrapItem key={course.id}>
                        <CourseCard
                          id={course.id}
                          subject={course.subject}
                          catalog={course.catalog}
                          desc={course.descr}
                          title={course.long_title}
                          formalSubject={course.formaldesc}
                          college={course.college_name}
                          minCredits={course.min_units}
                          maxCredits={course.max_units}
                          likes={course.likes}
                          dislikes={course.dislikes}
                          liked={ratingsData?.likes.includes(course.id)}
                          disliked={ratingsData?.dislikes.includes(course.id)}
                          refetchCourses={refetchCourses}
                          refetchRatings={refetchRatings}
                        />
                      </WrapItem>
                    ))
                  )}
                </Wrap>
              </InfiniteScroll>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
