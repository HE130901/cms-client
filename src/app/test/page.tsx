import { useStateContext } from "@/context/StateContext";

const UserProfile = () => {
  const { user, loading } = useStateContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.fullName}</p>
      <p>Citizen ID: {user.citizenId}</p>
    </div>
  );
};

export default UserProfile;
