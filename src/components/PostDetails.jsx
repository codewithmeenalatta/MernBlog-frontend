import { useEffect , useState } from "react";
import {  useParams , Link , useNavigate} from "react-router-dom";
import { API } from "../utils/Axios";
import CommentSection from "./CommentSection";
const PostDetails = () => {
    const { id} = useParams();
    const navigate = useNavigate();
    const [post , setPost] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setErrors] = useState("");
    const [showComments , setShowComments] = useState(false);

    //single post fetch function
    const getPostById = async () => {
     try {
        setLoading(true);
        setErrors('');
        const res = await API.get(`/post/${id}`);
        const data = res.data;
        console.log("post data recived:" , data );
        setPost(data.post);
        
     } catch (error) {
        console.error('error fetching post' , error);
            setError('faild to load post . please try again');
        
     }finally{
        setLoading(false)
     }
    };

    useEffect(() => {
        if(id){
            getPostById()
        }
    } , [id]);

    //loading state
    if(loading){
        return(
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading post...</p>
        </div>
      </div>

        );
    }

    //Error state

    if(error){
        return(
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <div className="space-x-4">
            <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
                              ← Go Back

            </button>
            <button onClick={getPostById}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
Try Again
            </button>
            </div>
</div>
</div>
        )
    }

    //post not found

    if(!post){
        return(
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The post you're looking for doesn't exist.</p>

          <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
                        ← Back to Home

          </Link>
</div>
</div>
        )
    }



    return (

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
        >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Posts

        </button>
</div>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
        {/* Post Image */}
        {post.image && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
                <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

        )}

        <div className="p-6 md:p-8">
            {/* post title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{post.title}</h1>
        {/* Author info & Date */}
                  <div className="flex items-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img
              src={post.author?.profile || `https://ui-avatars.com/api/?name=${post.author?.name}&background=6366f1&color=fff`}
              alt={post.author?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />

              <div className="ml-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{post.author?.name}</h3>
                <p className="font-semibold text-gray-900 dark:text-gray-400">@{post.author?.username}</p>
              </div>
              </div>

              <div className="ml-auto text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US' , {
                        year : 'numeric',
                        month : 'long',
                        day : 'numeric'
                    })}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('en-US' , {
                        hour : '2-digit',
                        minute : '2-digit'
                    })}
                </p>
              </div>
              </div>

              {/* Post Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
{post.content}
</div></div>
{/* Post Action  */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors" onClick={() => setShowComments(!showComments)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a9.863 9.863 0 01-4.906-1.295A9.9 9.9 0 0012 21c0-4.418-3.582-8-8-8s8-3.582 8-8"/>
                  </svg>
                  <span>{showComments ? "Hide" : "Comment"}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Post ID: {post._id?.slice(-6)}
              </div>
            </div>
          </div>

        </div>
</article>

{/* Comment Section */}
{showComments && <CommentSection/> }
</div>
    )
}
export default  PostDetails;