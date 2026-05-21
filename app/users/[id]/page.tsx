import { Metadata } from "next";
import { UserDetailContainer } from "./UserDetailContainer";
import { UserDetail } from "./types";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const resolvedParams = await params;

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${resolvedParams.id}`,
    );
    if (!res.ok) throw new Error();
    const user: UserDetail = await res.json();

    return {
      title: `${user.name} (@${user.username}) - User Profile`,
      description: `View profile details for ${user.name}. Contact email: ${user.email}, website: ${user.website}.`,
    };
  } catch {
    return {
      title: "User Profile Not Found",
      description: "The requested user profile could not be found.",
    };
  }
};

const UserDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params;

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen flex flex-col justify-center py-12">
      {/* Lempar id ke container */}
      <UserDetailContainer id={resolvedParams.id} />
    </div>
  );
};

export default UserDetailPage;
