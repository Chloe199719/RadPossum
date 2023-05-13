import { rest } from "msw";
import { setupServer } from "msw/node";
import prismaClient from "@/lib/prisma/prismaClient";
import fetchUserID from "@/lib/user/getUserByToken";
import handler from "../pages/api/admin/users/discount";
import { createMocks } from "node-mocks-http";

const mockedPrismaClient = prismaClient.user.update as jest.Mock;
jest.mock("../lib/prisma/prismaClient", () => ({
  user: {
    update: jest.fn(),
  },
}));

const mockedFetchUserID = fetchUserID as jest.Mock;
jest.mock("../lib/user/getUserByToken", () => jest.fn());

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("handler", () => {
  it("should return 405 when request method is not PUT", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 400 when body is not correct", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 401 when user is not admin", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: false });

    const { req, res } = createMocks({
      method: "PUT",
      body: { user: "test", discount: 0.1 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it("should return 400 when body does not pass zod validation", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: true });

    const { req, res } = createMocks({
      method: "PUT",
      body: { user: "test", discount: -1 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 500 when there is an internal server error", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: true });
    mockedPrismaClient.mockRejectedValue(new Error());

    const { req, res } = createMocks({
      method: "PUT",
      body: { user: "test", discount: 0.1 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
  });

  it("should return 200 when request is successful", async () => {
    mockedFetchUserID.mockResolvedValue({ isAdmin: true });
    mockedPrismaClient.mockResolvedValue({});

    const { req, res } = createMocks({
      method: "PUT",
      body: { user: "test", discount: 0.1 },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
