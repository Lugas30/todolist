import "@testing-library/jest-dom";

// Mock Next.js Navigation secara global untuk seluruh test suite
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === "filter") return "all";
      if (key === "sort") return "asc";
      return "";
    }),
    toString: jest.fn(() => ""),
  }),
}));