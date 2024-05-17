import { fetchAndTransformUserList } from "./fetchAndTransformUserList";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockData = {
  users: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 25,
      gender: "male",
      hair: { color: "Black" },
      company: { department: "Engineering" },
      address: { postalCode: "12345" },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
      gender: "female",
      hair: { color: "Blond" },
      company: { department: "Engineering" },
      address: { postalCode: "67890" },
    },
  ],
};

describe("fetchAndTransformUserList", () => {
  it("transforms the data correctly", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const transformedData = await fetchAndTransformUserList();

    expect(transformedData).toEqual({
      Engineering: {
        male: 1,
        female: 1,
        ageRange: "25-28",
        hair: { Black: 1, Blond: 1 },
        addressUser: { JohnDoe: "12345", JaneDoe: "67890" },
      },
    });
  });
});
