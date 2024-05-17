import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import details from "../lib/details";

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Head>
        <title>{details.testMap.test1.testTitle}</title>
        <meta
          name="description"
          content={`${details.testMap.test1.testTitle}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justify="space-between" align="center" mb={8} ml={10}>
        <Text fontWeight="bold" fontSize={["md", "lg", "xl", "2xl"]}>
          {details.testMap.test1.testTitle}
        </Text>
      </Flex>
      <TodoList />
    </Box>
  );
};

export default Home;
