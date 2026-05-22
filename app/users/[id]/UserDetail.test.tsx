import { render, screen, fireEvent } from "@testing-library/react";
import { UserDetailContainer } from "./UserDetailContainer";
import { useUserDetail } from "./useUserDetail";

// Mock custom hook useUserDetail
jest.mock("./useUserDetail");
const mockedUseUserDetail = useUserDetail as jest.Mock;

const mockSingleUser = {
  id: 1,
  name: "Lugas Gilas",
  username: "lugasgilas",
  email: "lugas@example.com",
  phone: "123-456",
  website: "lugas.dev",
  company: { name: "Nimbrung Dev", catchPhrase: "Coding elegantly" },
  address: {
    suite: "Apt. 12",
    street: "Margonda",
    city: "Depok",
    zipcode: "16400",
  },
};

const mockPosts = [
  { userId: 1, id: 101, title: "Nextjs Guide", body: "Learn dynamic routes" },
];
const mockTodos = [
  { userId: 1, id: 201, title: "Setup Jest Unit Test", completed: true },
];

describe("User Details Workspace (Task 4 & 6)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. Harus merender info profil dasar, alamat, dan perusahaan", () => {
    mockedUseUserDetail.mockReturnValue({
      user: mockSingleUser,
      posts: mockPosts,
      todos: mockTodos,
      error: null,
      isLoading: false,
    });

    render(<UserDetailContainer id="1" />);

    expect(screen.getByText("Lugas Gilas")).toBeInTheDocument();
    expect(screen.getByText("@lugasgilas")).toBeInTheDocument();
    expect(screen.getByText("Nimbrung Dev")).toBeInTheDocument();
    expect(screen.getByText(/Margonda/)).toBeInTheDocument();
  });

  it("2. Harus merender section Posts dan dapat berpindah ke Tab Todos", () => {
    mockedUseUserDetail.mockReturnValue({
      user: mockSingleUser,
      posts: mockPosts,
      todos: mockTodos,
      error: null,
      isLoading: false,
    });

    render(<UserDetailContainer id="1" />);

    // Default tab menampilkan Posts
    expect(screen.getByText("Nextjs Guide")).toBeInTheDocument();

    // Klik tab Todos
    const todosTabButton = screen.getByText(/Todos/);
    fireEvent.click(todosTabButton);

    // Sekarang posts hilang dan todos muncul
    expect(screen.queryByText("Nextjs Guide")).not.toBeInTheDocument();
    expect(screen.getByText("Setup Jest Unit Test")).toBeInTheDocument();
  });

  it("3. Harus menangani Edge Case: Invalid User ID (Bukan Angka)", () => {
    mockedUseUserDetail.mockReturnValue({
      user: null,
      posts: [],
      todos: [],
      error: null,
      isLoading: false,
    });

    render(<UserDetailContainer id="abc-invalid" />);
    expect(screen.getByText("Error: User ID tidak valid.")).toBeInTheDocument();
  });

  it("4. Harus menangani Edge Case: Missing User Data (User tidak ditemukan)", () => {
    mockedUseUserDetail.mockReturnValue({
      user: null,
      posts: [],
      todos: [],
      error: null,
      isLoading: false,
    });

    render(<UserDetailContainer id="999" />);
    expect(screen.getByText("User tidak ditemukan.")).toBeInTheDocument();
  });

  it("5. Harus merender error state jika fetching gagal", () => {
    mockedUseUserDetail.mockReturnValue({
      user: null,
      posts: [],
      todos: [],
      error: new Error("Network Error"),
      isLoading: false,
    });

    render(<UserDetailContainer id="1" />);
    expect(
      screen.getByText("Terjadi kesalahan memuat data workspace user."),
    ).toBeInTheDocument();
  });
});
