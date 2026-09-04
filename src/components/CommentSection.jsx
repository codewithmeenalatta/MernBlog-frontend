import { useEffect, useState } from "react";
import { API } from "../utils/Axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/contextApi";
const CommentSection = () => {
    const {id: postId} = useParams();
    const [comments , setComments] = useState([])
    const [text , setText] =  useState('')
    const [loading , setLoading] = useState(false)
    const {token} =  useAuth()

    //get all comments
    const fetchComments = async () => {
        try {
            const res = await API.get(`/comment/all/${postId}`)
            setComments(res.data.comments)
        } catch (error) {
            console.log(error)
            toast.error("failed to fetch comments")
        }
    }

    //add new comment

    const handleAddComment = async () => {
        if(!text.trim()) return
        try {
            setLoading(true)
            const res =  await API.post(`/comment/add/${postId} , ` , {text} , {withCredentials : true})
            setComments([res.data.comments, ...comments]);
            setText("");
            toast.success(res.data.message)
        } catch (error) {
            console.log(err)
            toast.comments("failed to add comment")
        }finally{
            setLoading(false)
        }

    };

    useEffect(() => {
        fetchComments()
    }, [postId]);
    if(!token){
        return (
                  <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <p className="text-gray-400">Please login to add comments.</p>
      </div>

        )
    }
    return(
        <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>

{/* Comment List */}
<div className="space-y-4">
    {comments.map((comments) => (
        <div key={comments._id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <img
            src={comment.author?.profile || `ttps://ui-avatars.com/api/?name=${comment.author?.name}`}
                            alt="user"
                className="w-8 h-8 rounded-full"

            />
                          <div>
                <p className="text-sm font-semibold">{comment.author?.name}</p>
                <p className="text-xs text-gray-500">@{comment.author?.username}</p>
            </div>
            <p className="text-gray-800 dark:text-white">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>

        </div>
    ))}
    {comments.length === 0 && <p className="text-gray-400">No comments yet.</p>}
    {/* input box */}
    <textarea
    rows="3"
          value={text}
 
          onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring"

    />
    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
    onClick={handleAddComment}
    disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
    </button>
</div>
        </div>
    )
};
export default CommentSection;