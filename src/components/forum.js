// import React from 'react'
// import { StickyNavbar } from './StickyNavbar'
// import NavBar from './sidebar/NavBar'
import image1 from '../assets/image2.jpg';

// const data = {
//     mps : [
//         {name : "Mwaluko", title : "Water scrcity", description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"}
//     ],
//   citizens : [
//         {name : "Mwaluko", title : "Water scrcity", description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"},
//         {name : "Mwaluko", title : "Water scrcity", description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"}
//     ]
// }

// export default function Forum() {
//   return (
//     <div>
//         <NavBar />
//           {/* <!-- component --> */}
// <div class="container bg-gray-200 mx-auto w-full h-full">
//   <div class="relative wrap overflow-hidden p-10 h-full">
//     <div class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border w-6/12"></div>
//     {/* <!-- right timeline --> */}

//     {
//         data &&  data.mps &&(
//             data.mps.map((item,index) =>(
//                 <div key={index}>
//                  <div class="mb-8 flex justify-between items-center w-full right-timeline">
//       <div class="order-1 w-5/12"></div>
//       <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
//         <h1 class="mx-auto font-semibold text-lg text-white">1</h1>
//       </div>
//       <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
//         <h3 class="mb-3 font-bold text-gray-800 text-xl">{item.title} </h3>
//         <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//       </div>
//     </div>
//                 </div>
//             ))
//         )
//     }
    

//     {/* <!-- left timeline --> */}
    
    
//       {
//         data && data.citizens &&(
//             data.citizens.map((item,index) => (
//                 <div key={index}>
//                        <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
//       <div class="order-1 w-5/12"></div>
//       <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
//         <h1 class="mx-auto text-white font-semibold text-lg">2</h1>
//       </div>
//       <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
//         <h3 class="mb-3 font-bold text-white text-xl"> {item.title} </h3>
//         <p class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//       </div>
//     </div>
//                 </div>
//             ))
//         )
//       }
    
//   </div>
// </div>
//     </div>
//   )
// }


import React, { useState } from 'react';

const Forum = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLiked(!liked);
    // Send a request to your backend to update the like status in the database
  };

  const handleComment = () => {
    if (comment.trim() !== '') {
      // Update the comments locally
      setComments([...comments, { user: 'Current User', text: comment }]);
      setComment('');

      // Send a request to your backend to save the comment in the database
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <img className="w-full h-64 object-cover" src={image1} alt="Post" />

      <div className="p-6">
        <div className="flex items-center">
          <button
            className={`${
              liked ? 'text-red-500' : 'text-gray-500'
            } focus:outline-none`}
            onClick={handleLike}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {liked ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2 9.36 2 11.11 3.36 12 5.11 12.89 3.36 14.64 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
                />
              ) : (
                <path d="M0 0h24v24H0z" fill="none" />
              )}
            </svg>
          </button>
          <span className="ml-2">{liked ? 'Liked!' : ''}</span>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Post
          </button>
        </div>

        <div className="mt-4">
          <strong className="block mb-2">Comments:</strong>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="mb-1">
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Forum;
