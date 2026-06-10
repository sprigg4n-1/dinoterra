import UserDashboardPage from "@/app/sections/dashboard/users/UserDashboardPage";

const UserDashboard = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <UserDashboardPage id={id} />;
};

export default UserDashboard;
