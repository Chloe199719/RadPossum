import { rest } from "msw";
import { setupServer } from "msw/node";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import handler from "@/pages/api/admin/users/search";
import { createMocks } from "node-mocks-http";

// Explicitly type the mocks
const mockPrismaFindMany = prismaClient.user.findMany as jest.Mock;
jest.mock("../../../lib/prisma/prismaClient", () => ({
  user: {
    findMany: jest.fn(),
  },
}));

const mockedFetchUserID = fetchUserID as jest.Mock;
jest.mock("../../../lib/user/getUserByToken", () => jest.fn());

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("handler", () => {
  it("should return 405 when request method is not GET", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 400 when no search term is provided", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 when only a simple space is provided", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        searchTerm: " ",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
  it("should return 401 when user is not admin", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: false });

    const { req, res } = createMocks({
      method: "GET",
      query: { searchTerm: "test" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it("should return 200 and the search results when everything is correct", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: true });
    mockPrismaFindMany.mockResolvedValue([
      { name: "test", email: "test@test.com", discord: "test" },
    ]);

    const { req, res } = createMocks({
      method: "GET",
      query: { searchTerm: "test" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([
      { name: "test", email: "test@test.com", discord: "test" },
    ]);
  });

  it("should return 500 when there is an internal server error", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: true });
    mockPrismaFindMany.mockRejectedValue(new Error());

    const { req, res } = createMocks({
      method: "GET",
      query: { searchTerm: "test" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
