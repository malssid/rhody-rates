import Course from "../utils/Course";
import { useQuery } from "react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery(
    "likes",
    async () => {
      const likes = await Course.getLikes();
      return likes;
    },
    { refetchOnWindowFocus: false }
  );
  
  return <></>;
}
