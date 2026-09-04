import React , {useEffect , useState} from "react";
import { API } from "../utils/Axios";
import { toast } from "react-toastify";
const Profile = () => {
    const [ userData ,setUserData ] =  useState(null);
    const [loading , setLoading] = useState(true);
    useEffect (() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/user/profile' , {
                    withCredentials : true
                });
                setUserData(res.data.user);

            } catch (error) {
                console.error('Error Fetching Profile' , error);
                toast.error('Failed to load profile');
            }finally{
                setLoading(false)
            }
        };
        fetchProfile();
    } , []);

    if(loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if(!userData) return <div className="text-center mt-20 text-xl text-red-500">User not found</div>

    return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded border">
          <span className="text-sm text-gray-500 block">Name</span>
          <span className="text-lg font-medium">{userData.name}</span>
        </div>

        <div className="p-3 bg-gray-50 rounded border">
          <span className="text-sm text-gray-500 block">Username</span>
          <span className="text-lg font-medium">@{userData.username}</span>
        </div>

        <div className="p-3 bg-gray-50 rounded border">
          <span className="text-sm text-gray-500 block">Email</span>
          <span className="text-lg font-medium">{userData.email}</span>
        </div>
      </div>
    </div>
  );
};

export default  Profile;