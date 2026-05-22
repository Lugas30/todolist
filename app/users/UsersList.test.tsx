import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "./page";
import { useUsers } from "./useUsers";

// Mock custom hook useUsers
jest.mock("./useUsers");
const mockedUseUsers = useUsers as jest.Mock;

const mockUsersData = [
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    website: "anastasia.net",
    totalPosts: 10,
    completedTodos: 8,
    pendingTodos: 12,
  },
];

describe("Users List Workspace (Task 4 & 6)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. Harus merender data user beserta activity signals (Posts, Done, Pending)", () => {
    mockedUseUsers.mockReturnValue({
      users: mockUsersData,
      error: null,
      isLoading: false,
      searchQuery: "",
      filterType: "all",
      sortOrder: "asc",
      setSearchQuery: jest.fn(),
      setFilterType: jest.fn(),
      setSortOrder: jest.fn(),
    });

    render(<UsersPage />);

    // Cek render nama dan email
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    expect(screen.getByText("Shanna@melissa.tv")).toBeInTheDocument();

    // Cek activity signals terhitung dengan benar di tabel/card
    expect(screen.getByText("10")).toBeInTheDocument(); // Total posts user 1
    expect(screen.getByText("8")).toBeInTheDocument(); // Completed todos user 1
    expect(screen.getByText("12")).toBeInTheDocument(); // Pending todos user 1
  });

  it("2. Harus memicu fungsi pencarian (Search) saat input diisi", () => {
    const setSearchQueryMock = jest.fn();
    mockedUseUsers.mockReturnValue({
      users: mockUsersData,
      error: null,
      isLoading: false,
      searchQuery: "",
      filterType: "all",
      sortOrder: "asc",
      setSearchQuery: setSearchQueryMock,
      setFilterType: jest.fn(),
      setSortOrder: jest.fn(),
    });

    render(<UsersPage />);

    const searchInput = screen.getByPlaceholderText("Nama atau email...");
    fireEvent.change(searchInput, { target: { value: "Lugas" } });

    expect(setSearchQueryMock).toHaveBeenCalledWith("Lugas");
  });

  it("3. Harus memicu perubahan filter aktivitas tambahan", () => {
    const setFilterTypeMock = jest.fn();
    mockedUseUsers.mockReturnValue({
      users: mockUsersData,
      error: null,
      isLoading: false,
      searchQuery: "",
      filterType: "all",
      sortOrder: "asc",
      setSearchQuery: jest.fn(),
      setFilterType: setFilterTypeMock,
      setSortOrder: jest.fn(),
    });

    render(<UsersPage />);

    const filterSelect = screen.getByLabelText("Filter Aktivitas");
    fireEvent.change(filterSelect, { target: { value: "pending" } });

    expect(setFilterTypeMock).toHaveBeenCalledWith("pending");
  });

  it("4. Harus menampilkan Loading State (Skeleton) dengan benar", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      error: null,
      isLoading: true,
      searchQuery: "",
      filterType: "all",
      sortOrder: "asc",
    });

    const { container } = render(<UsersPage />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("5. Harus menampilkan Error State jika request gagal", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      error: new Error("Gagal memuat data"),
      isLoading: false,
      searchQuery: "",
      filterType: "all",
      sortOrder: "asc",
    });

    render(<UsersPage />);
    expect(
      screen.getByText("Terjadi kesalahan memuat data operasi."),
    ).toBeInTheDocument();
  });

  it("6. Harus menampilkan Empty State jika hasil filter tidak cocok", () => {
    mockedUseUsers.mockReturnValue({
      users: [],
      error: null,
      isLoading: false,
      searchQuery: "NamaAsing",
      filterType: "all",
      sortOrder: "asc",
    });

    render(<UsersPage />);
    expect(
      screen.getByText(
        "Tidak ada data user yang cocok dengan kriteria pencarian dan filter.",
      ),
    ).toBeInTheDocument();
  });
});
