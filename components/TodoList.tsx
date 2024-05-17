import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import initialData from "../lib/initialData";

type Item = {
  id: string;
  type: "Fruit" | "Vegetable";
  name: string;
};

const transformData = (
  data: { type: "Fruit" | "Vegetable"; name: string }[]
): Item[] => {
  return data.map((item, index) => ({
    ...item,
    id: (index + 1).toString(),
  }));
};

const initialItems: Item[] = transformData(initialData);

const TodoList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const timeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    console.log("Items:", items);
    console.log("Fruits:", fruits);
    console.log("Vegetables:", vegetables);
  }, [items, fruits, vegetables]);

  const handleMove = (item: Item) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    if (item.type === "Fruit") {
      setFruits((prevFruits) => [...prevFruits, item]);
      timeoutsRef.current[item.id] = setTimeout(
        () => moveBackToList(item, "fruit"),
        5000
      );
    } else {
      setVegetables((prevVegetables) => [...prevVegetables, item]);
      timeoutsRef.current[item.id] = setTimeout(
        () => moveBackToList(item, "vegetable"),
        5000
      );
    }
  };

  const moveBackToList = (item: Item, from: "fruit" | "vegetable") => {
    if (from === "fruit") {
      setFruits((prevFruits) => prevFruits.filter((i) => i.id !== item.id));
    } else {
      setVegetables((prevVegetables) =>
        prevVegetables.filter((i) => i.id !== item.id)
      );
    }
    setItems((prevItems) => [...prevItems, item]);
    clearTimeout(timeoutsRef.current[item.id]);
    delete timeoutsRef.current[item.id];
  };

  const handleMoveBackImmediately = (
    item: Item,
    from: "fruit" | "vegetable"
  ) => {
    moveBackToList(item, from);
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const boxShadowColor = useColorModeValue("md", "dark-lg");
  const headingBgColor = useColorModeValue("gray.300", "orange.500");

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-around"
      p={4}
      h="100vh"
    >
      <Box
        borderRadius="lg"
        // border="1px solid"
        // borderColor={borderColor}
        // p={4}
        w={{ base: "100%", md: "30%", sm: "30%" }}
        mb={{ base: 4, md: 0, sm: 0 }}
        // boxShadow={boxShadowColor}
        // bg={bgColor}
      >
        {/* <Heading
          size="md"
          mb={4}
          p={2}
          bg={headingBgColor}
          textAlign="center"
          fontWeight="bold"
        >
          Main List
        </Heading> */}
        {items.map((item) => (
          <Button
            key={item.id}
            w="100%"
            mb={2}
            onClick={() => handleMove(item)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        p={4}
        w={{ base: "100%", md: "30%", sm: "30%" }}
        mb={{ base: 4, md: 0, sm: 0 }}
        boxShadow={boxShadowColor}
        bg={bgColor}
      >
        <Heading
          size="md"
          mb={4}
          p={2}
          bg={headingBgColor}
          textAlign="center"
          fontWeight="bold"
        >
          Fruits
        </Heading>
        {fruits.map((item) => (
          <Button
            key={item.id}
            w="100%"
            mb={2}
            onClick={() => handleMoveBackImmediately(item, "fruit")}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        p={4}
        w={{ base: "100%", md: "30%", sm: "30%" }}
        mb={{ base: 4, md: 0, sm: 0 }}
        boxShadow={boxShadowColor}
        bg={bgColor}
      >
        <Heading
          size="md"
          mb={4}
          p={2}
          bg={headingBgColor}
          textAlign="center"
          fontWeight="bold"
        >
          Vegetables
        </Heading>
        {vegetables.map((item) => (
          <Button
            key={item.id}
            w="100%"
            mb={2}
            onClick={() => handleMoveBackImmediately(item, "vegetable")}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Flex>
  );
};

export default TodoList;
