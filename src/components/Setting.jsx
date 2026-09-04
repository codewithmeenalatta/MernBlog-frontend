import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // API call ke liye
import { toast } from 'react-toastify'; // Success/Error message dikhane ke liye

export default function SettingsPage() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // STEP 1: Form Inputs ke liye State banana
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  // STEP 2: Page load hote hi Backend se User ka data lana
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Aapke backend ka URL jahan GET /profile route hai
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          withCredentials: true // Ye zaroori hai taaki cookies (token) backend tak jaye
        });
        
        // Backend se data aane ke baad state mein set karna
        if (response.data.user) {
          setProfileData({
            name: response.data.user.name || '',
            username: response.data.user.username || '',
            bio: response.data.user.bio || ''
          });
        }
      } catch (error) {
        console.error("Data fetch nahi hua", error);
      }
    };

    fetchProfileData();
  }, []); // Khali array ka matlab hai ye sirf page load par ek baar chalega

  // STEP 3: "Save Profile" button click hone par chalne wala function
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    try {
      const response = await axios.put('http://localhost:5000/api/user/update-profile', profileData, {
        withCredentials: true
      });
      toast.success("Profile Updated Successfully!");
      navigate('/profile'); // Success notification
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed!");
    }
  };

  // STEP 4: "Update Account" (Password) button click hone par
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/user/update-password', passwordData, {
        withCredentials: true
      });
      toast.success("Password changed successfully!");
      // Password change hone ke baad input fields khali kar do
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[650px]">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-72 bg-gray-50/50 border-r border-gray-200 p-6">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Settings</h2>
            <nav className="space-y-3">
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}>
                Public Profile
              </button>
              <button onClick={() => setActiveTab('account')} className={`w-full flex items-center text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'account' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}>
                Account Settings
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 md:p-10">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Public Profile</h3>
                  <p className="text-sm text-gray-500 mt-1">This information will be displayed publicly so be careful what you share.</p>
                </div>
                <hr className="border-gray-200" />

                {/* Profile Form */}
                <form className="space-y-4" onSubmit={handleProfileUpdate}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input 
                      type="text" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      value={profileData.username} 
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      rows="4" 
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                      placeholder="Write a few sentences about yourself..."
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Account Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your account credentials and security.</p>
                </div>
                <hr className="border-gray-200" />
                
                <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Change Password</h4>
                    <div className="space-y-3">
                      <input 
                        type="password" 
                        placeholder="Current Password" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        required
                      />
                      <input 
                        type="password" 
                        placeholder="New Password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                        required
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between items-center">
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}