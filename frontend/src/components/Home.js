import { useInfiniteQuery, useQuery } from "react-query";
import Course from "../utils/Course";
import Student from "../utils/Student";
import { Flex, Heading, Box, Wrap, WrapItem, Button } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import CourseCard from "./CourseCard";
import Header from "./Header";
import { useState } from "react";
import Loading from "./Loading";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");

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

  return isLoadingCourses || isLoadingCourses ? (
    <Loading />
  ) : (
    <>
      <Header setKeyword={setKeyword} setSort={setSort} sort={sort}/>
      <Flex direction="column" justify="center" align="center">
        <div
          style={{ height: "87vh", overflowY: "overlay", overflowX: "hidden" }}
        >
          <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
            useWindow={false}
          >
            <Wrap justify="center" mt={8}>
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
        </div>
      </Flex>
    </>
  );
}
