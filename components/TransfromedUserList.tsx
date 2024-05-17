import React, { useEffect, useState } from "react";
import { fetchAndTransformUserList } from "../lib/fetchAndTransformUserList";
import { Box, Text, useColorModeValue, Code } from "@chakra-ui/react";

interface TransformedData {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: { [color: string]: number };
    addressUser: { [name: string]: string };
  };
}

const TransformedUserList: React.FC = () => {
  const [data, setData] = useState<TransformedData | null>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const codeBgColor = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    fetchAndTransformUserList().then(setData);
  }, []);

  if (!data) return <Text>Loading...</Text>;

  const formattedData = JSON.stringify(data, null, 2);

  return (
    <Box bg={bgColor} p={6} borderRadius="md" boxShadow="md" mt={6}>
      <Code
        p={4}
        display="block"
        whiteSpace="pre"
        bg={codeBgColor}
        borderRadius="md"
      >
        {formattedData}
      </Code>
    </Box>
  );
};

export default TransformedUserList;
