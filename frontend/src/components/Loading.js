import BarLoader from "react-spinners/BarLoader";
import { Flex } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex height="100vh" align="center" justify="center">
      <BarLoader width="50vw" height="15px" color="#E2E8F0"/>
    </Flex>
  );
}
