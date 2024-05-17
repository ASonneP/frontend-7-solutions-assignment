import Head from "next/head";
import { Box, Heading, Flex, Button, IconButton } from "@chakra-ui/react";
import Hero from "@/components/Hero";
import details from "../lib/details";

const Home: React.FC = () => {
  return (
    <Box p={4}>
      <Head>
        <title>{details.testTitle}</title>
        <meta name="description" content={`${details.testInfo}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
    </Box>
  );
};

export default Home;
