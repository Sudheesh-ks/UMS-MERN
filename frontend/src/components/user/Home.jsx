import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, LogOut, Settings, Shield, Upload } from 'lucide-react';
import {updateUser,logoutUser} from "../../redux/userSlice"
import { useSelector, useDispatch } from 'react-redux';
import toast, {Toaster } from "react-hot-toast";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '', 
    avatar: null
  })

  const { user,error } = useSelector((state) => state.user)
  const navigate=useNavigate()

  useEffect(()=>{
  if(!user){
    navigate("/login")
  }
  },[])

  const dispatch = useDispatch()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setFormData(prev => ({ ...prev, avatar: file }))
      }
      reader.readAsDataURL(file)
    }
  }

  const onLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  const handleEditProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const valid = await dispatch(updateUser({...formData,id:user.id}))

    if(!valid){
      toast.error(error)
    }else{
      setIsEditModalOpen(false)
    }
    setIsLoading(false)
  };

  const openEditModal = () => {
    setFormData({
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      avatar: user.avatar
    });
    setPreviewImage(user.image || null);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MyApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === 'admin' && (
                <button
                  onClick={() => window.location.href = '/admin/dashboard'}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
                >
                  <Shield className="h-4 w-4 mr-2 text-blue-600" />
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={openEditModal}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {user?.avatar || previewImage ? (
                <img
                  src={user?.avatar || previewImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2 text-gray-500">{new Date(user?.createdAt).toDateString()}</p>
              {user?.bio && <p className="mt-4 text-gray-700">{user?.bio}</p>}
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md m-4">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleEditProfile} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {user?.avatar || previewImage ? (
                    <img
                      src={user?.avatar || previewImage}
                      alt="Profile Preview"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <label
                    htmlFor="modal-profile-image"
                    className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <input
                      type="file"
                      id="modal-profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Upload className="h-4 w-4 text-white" />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Click the button to update your profile picture</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Home;