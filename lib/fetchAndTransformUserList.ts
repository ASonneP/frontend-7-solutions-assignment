import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hair: {
    color: string;
  };
  company: {
    department: string;
  };
  address: {
    postalCode: string;
  };
}

interface TransformedData {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: { [color: string]: number };
    addressUser: { [name: string]: string };
  };
}

export const fetchAndTransformUserList = async (): Promise<TransformedData> => {
  const response = await axios.get("https://dummyjson.com/users");
  const users: User[] = response.data.users;

  const transformedData: TransformedData = {};

  users.forEach((user) => {
    const { company, gender, age, hair, address, firstName, lastName } = user;
    const department = company.department;

    if (!transformedData[department]) {
      transformedData[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const departmentData = transformedData[department];

    if (gender === "male") departmentData.male += 1;
    if (gender === "female") departmentData.female += 1;

    const ages = departmentData.ageRange
      ? departmentData.ageRange.split("-").map(Number)
      : [age, age];

    ages[0] = Math.min(ages[0], age);
    ages[1] = Math.max(ages[1], age);
    departmentData.ageRange = `${ages[0]}-${ages[1]}`;

    departmentData.hair[hair.color] =
      (departmentData.hair[hair.color] || 0) + 1;

    departmentData.addressUser[`${firstName}${lastName}`] = address.postalCode;
  });

  return transformedData;
};
