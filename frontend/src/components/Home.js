import { useInfiniteQuery } from "react-query";
import Course from "../utils/Course";
import { Flex, Heading, Box, Wrap, WrapItem } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import CourseCard from "./CourseCard";
import Header from "./Header";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["courses", keyword],
      ({ pageParam = 1 }) => Course.getCourses(pageParam, keyword),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
          return undefined;
        },
      }
    );

  return (
    <Flex direction="column" justify="center" align="center">
      <Header setKeyword={setKeyword} />
      <div style={{ height: "700px", overflowY: "auto", overflowX: "hidden" }}>
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          useWindow={false}
        >
          <Wrap justify="center" mt={8}>
            {data?.pages.map((page) =>
              page.results.map((course) => (
                <WrapItem key={course.id}>
                  <CourseCard
                    subject={course.subject}
                    catalog={course.catalog}
                    title={course.long_title}
                  />
                </WrapItem>
              ))
            )}
          </Wrap>
        </InfiniteScroll>
      </div>
    </Flex>
  );
}
