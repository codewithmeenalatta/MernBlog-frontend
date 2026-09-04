import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/Axios";
// 🔥 CHANGES: Trash2 icon add kiya hai delete button ke liye
import { Eye, X, Trash2 } from "lucide-react"; 
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch old post data when page loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/${id}`);
        const postData = res.data.post; 
        
        setFormData({
          title: postData.title,
          content: postData.content
        });

        if (postData.image) {
          setImagePreview(postData.image);
        }

      } catch (error) {
        console.error('Error fetching post', error);
        toast.error('Failed to load post data');
        navigate(-1); 
      }
    };
    if(id){
        fetchPost();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if(document.getElementById("image-input")){
        document.getElementById("image-input").value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content both are required");
      return;
    }
    
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      
      if (image) submitData.append("image", image);
      
      const res = await API.put(`/post/edit/${id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials : true
      });
      
      const data = res.data;
      toast.success(data.message || "Post updated successfully!");
      navigate(`/dashboard`); 

    } catch (error) {
      console.error(error);
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if(confirmDelete){
        setLoading(true);
        try {
            // 🔥 CHANGES: Yahan Single quote (' ') hata kar Backticks ( ` ` ) lagaye hain taki ${id} kaam kare
            await API.delete(`/post/${id}` , {
                withCredentials :  true
            });
            toast.success('Post Deleted Successfully!');
            navigate("/"); // Delete ke baad home page par chala jayega
            
        } catch (error) {
            console.error("Error deleting post" , error);
            toast.error('Failed to delete post. Please try again.');
        } finally{
            setLoading(false);
        }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Edit your Title"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">Image (optional)</label>
          {!imagePreview ? (
            <div className="border-2 border-dashed p-4 rounded-md text-center">
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="image-input" className="cursor-pointer text-blue-500">
                Upload Image
              </label>
            </div>
          ) : (
            <div className="relative inline-block w-full">
              <img src={imagePreview} className="w-full rounded-md max-h-64 object-cover" alt="preview" />
              <button
                type="button"
                onClick={removeImage} 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-y"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-2 rounded hover:bg-gray-200"
          >
            <Eye size={18} />
            Preview
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>

          {/* 🔥 CHANGES: Yahan Delete Button Add kiya gaya hai */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </form>

      {/* Preview Section */}
      {previewMode && (
        <div className="mt-10 bg-white rounded shadow p-6 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="w-full mb-4 rounded max-h-96 object-cover" />
          )}
          <div className="text-gray-800 whitespace-pre-wrap">{formData.content}</div>
          <button
            onClick={() => setPreviewMode(false)}
            className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPost;