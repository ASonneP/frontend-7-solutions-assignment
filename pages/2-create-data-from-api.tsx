import Head from "next/head";
import { Box, Flex, Text } from "@chakra-ui/react";
import details from "../lib/details";
import TransfromedUserList from "@/components/TransfromedUserList";
const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Head>
        <title>{details.testMap.test2.testTitle}</title>
        <meta
          name="description"
          content={`${details.testMap.test2.testTitle}`}
        />
      </Head>
      <Flex justify="space-between" align="center" mb={8} ml={10}>
        <Text fontWeight="bold" fontSize={["md", "lg", "xl", "2xl"]}>
          {details.testMap.test2.testTitle}
        </Text>
      </Flex>
      <TransfromedUserList />
    </Box>
  );
};

export default Home;
