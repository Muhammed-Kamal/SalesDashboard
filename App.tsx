import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Targets } from './pages/Targets';
import { Achievements } from './pages/Achievements';
import { Login } from './pages/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Camera, X } from 'lucide-react';
import toast from 'react-hot-toast';

const queryClient = new QueryClient();

function DashboardLayout() {
  return (
    <Layout>
      <ErrorBoundary>
        <div className="space-y-8">
          <Targets />
        </div>
      </ErrorBoundary>
    </Layout>
  );
}

function Analytics() {
  return (
    <Layout>
      <ErrorBoundary>
        <div className="space-y-8">
          <Achievements />
        </div>
      </ErrorBoundary>
    </Layout>
  );
}

function Settings() {
  const [users, setUsers] = React.useState([
    { username: 'salesadmin', role: 'Administrator', email: 'admin@souhoola.com', active: true }
  ]);
  const [showAddUser, setShowAddUser] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ username: '', password: '', email: '', role: 'User' });
  const [profilePhoto, setProfilePhoto] = React.useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces");
  const [showPhotoModal, setShowPhotoModal] = React.useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, active: true }]);
    setNewUser({ username: '', password: '', email: '', role: 'User' });
    setShowAddUser(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        setShowPhotoModal(false);
        toast.success('Profile photo updated successfully');
      };
      reader.onerror = () => {
        toast.error('Error reading file');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout profilePhoto={profilePhoto}>
      <ErrorBoundary>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Profile</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setShowPhotoModal(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"
                      >
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium">salesadmin</p>
                      <p className="text-gray-400">Sales Administrator</p>
                      <button
                        onClick={() => setShowPhotoModal(true)}
                        className="mt-2 text-sm text-[#35de75] hover:text-[#2bc364]"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="btn bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold px-4 py-2 rounded-lg"
                  >
                    Add New User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Username</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-3 px-4">{user.username}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">{user.role}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {showAddUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Add New User</h3>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="User">User</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold py-2 rounded-lg"
                    >
                      Add User
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddUser(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showPhotoModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Update Profile Photo</h3>
                  <button
                    onClick={() => setShowPhotoModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Camera className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        Click to upload a photo
                        <br />
                        (Max size: 5MB)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;