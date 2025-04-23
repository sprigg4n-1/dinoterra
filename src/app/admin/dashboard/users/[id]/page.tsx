import UserDashboardPage from "@/app/sections/dashboard/users/UserDashboardPage";

const UserDashboard = async ({ params }: { params: any }) => {
  const { id } = await params;

  return (
    <>
      <UserDashboardPage id={id} />
    </>
  );
};

export default UserDashboard;
