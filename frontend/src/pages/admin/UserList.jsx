import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import { getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";

const UserList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { profiles } = useSelector((state) => state.profile || { profiles: [] });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await dispatch(getAllUsersProfile());
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-4 flex items-center justify-center">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(profiles) && profiles.map((user) => (
            user && (
              <div key={user._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profilePhoto?.url || '/default-avatar.png'}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">{user.username}</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      user.isBlocked
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white`}
                    onClick={() => {
                      // TODO: Implement handleBlockUser functionality
                      console.log('Block/unblock user:', user._id);
                    }}
                  >
                    {user.isBlocked ? 'Unblock User' : 'Block User'}
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;