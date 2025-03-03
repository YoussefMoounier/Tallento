import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlockedUsers, unblockUserSuccess as unblockUser } from '../../redux/slices/blockSlice';
import AdminSidebar from './AdminSidebar';
import { Spinner } from 'flowbite-react';

export default function BlockList() {
  const dispatch = useDispatch();
  const { blockedUsers, loading, error } = useSelector((state) => state.block);

  useEffect(() => {
    dispatch(fetchBlockedUsers());
  }, [dispatch]);

  const handleUnblock = (userId) => {
    if (window.confirm('Are you sure you want to unblock this user?')) {
      dispatch(unblockUser(userId))
        .then(() => dispatch(fetchBlockedUsers()))
        .catch((err) => console.error('Unblock error:', err));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-64 flex-shrink-0">
        <AdminSidebar />
      </div>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Blocked Users Management
          </h1>

          {loading ? (
            <div className="text-center py-8">
              <Spinner aria-label="Loading blocked users" size="xl" />
              <p className="mt-2 text-gray-600">Loading blocked users...</p>
            </div>
          ) : error ? (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              Error: {error}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blocked Since
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blockedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={user.profilePhoto?.url || '/default-avatar.png'}
                            alt={user.username}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(user.blockedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleUnblock(user._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Unblock User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}