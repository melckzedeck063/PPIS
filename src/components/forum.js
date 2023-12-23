import React, { useEffect, useState } from 'react';
import image1 from '../assets/image2.jpg';
import SideNav from './sidebar/SideNav';
import NavBar from './sidebar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import AuthUser from '../context/authUser';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from './sidebar/Footer';
import { concernComment, getConcernComments } from '../store/actions/concern_actions';

const schema = Yup.object({
  comment: Yup
  .string()
  .required()
  .trim(),
  concernUid  :  Yup
  .string()
  .trim()
});

const Forum = () => {
  // ... (existing code)
  const currentConcern = useSelector((state) => state.concerns);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [containHaras, setContainHaras] =  useState(false);
  const dispatch  =   useDispatch();

  const [replies, setReplies] = useState([
    // { message: 'hello dear', user: 'Cotton zedeck', date: '13-11-2023' },
  ]);

  const harassmentWords = ['mjinga', 'stupid', 'pumbavu', 'inappropriate'];

  const { register, handleSubmit, reset, formState: { errors, isValid, isDirty, isSubmitSuccessful } } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(schema)
  });

  const checkForAbuse = async (data) => {
    try {
      const edenAIOptions = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/text/moderation',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjA3ZTQ5YWQtMmYyOS00OGIzLWE1ODktYzdhN2ZhNDBjNGY0IiwidHlwZSI6ImFwaV90b2tlbiJ9.h-WZ4vFLlI0_LFytgUW8HsUrIBayqcV4JLdzw-Mmooo',
          'Content-Type': 'application/json',
        },
        data: {
          providers: 'microsoft, openai',
          language: 'en',
          text: `${data.comment}`,
          fallback_providers: '',
        },
      };

     const edenAIResponse = await axios.request(edenAIOptions);

    console.log(edenAIResponse.data);

    // Handle the EdenAI response
    if (edenAIResponse.data && edenAIResponse.data.is_abusive) {
      alert('Your content contains abusive language. Please revise and try again.');
    } else {
      // Check OpenAI nsfw_likelihood_score
      const nsfwLikelihoodScore = edenAIResponse.data.openai.nsfw_likelihood_score || 0;

      if (nsfwLikelihoodScore > 0.5) {
        alert('Your content may not be appropriate. Please revise and try again.');
      } else {
        // If content is not abusive, proceed with form submission
           dispatch(concernComment(data))
          // console.log(data);
        console.log('Content is not abusive');
      }
    }
    } catch (error) {
      console.error(error.response);
      // Handle EdenAI API error here
      alert('An error occurred while checking for abuse. Please try again later.');
    }
  };
  
  

  // const handleCommentSubmit = async () => {
  //   // Check for harassment words
  //   const containsHarassment = harassmentWords.some((word) =>
  //     comment.toLowerCase().includes(word)
  //   );

  //   if (containsHarassment) {
  //     // Display an error or handle appropriately
  //     console.error('Comment contains harassment words. Please revise.');
  //     setContainHaras(true);
  //     return;
  //   }

  //   // Check for abuse using the checkForAbuse function
  //   const isAbusive = await checkForAbuse(comment);

  //   if (!isAbusive) {
  //     // If content is abusive, stop further processing
  //     return;
  //   }

  //   // Continue with the normal submission logic
  //   const newComment = {
  //     message: comment,
  //     user: 'Current User', // Replace with the actual user data
  //     date: moment().format('DD-MM-YYYY'), // Use the current date
  //   };

  //   // Update the replies state with the new comment
  //   setReplies([...replies, newComment]);

  //   // Reset comment state and hide the form
  //   setComment('');
  //   setCommentFormVisible(false);
  // };

  const onSubmit = (data) => {
    checkForAbuse(data);
    // console.log(data)

    setTimeout(() => {
        dispatch(getConcernComments(data.concernUid))
    }, 2000);
  }

  // ... (existing code)
  const { token } = AuthUser();
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // Use the token from useAuthUser
      const { userType } = token;
      setUserRole(userType);
    };

    fetchData();
  }, [token]);

  useEffect(()  => {
    if(isSubmitSuccessful){
      reset({
        comment : ""
      })
    }
  })

  console.log(currentConcern.concern_comments);

  return (
    <div className="flex w-full">
      <SideNav />
      <div className="w-full bg-slate-200">
        <NavBar />
        <div className="pl-4">
          <div className="bg-white p-4 my-4 rounded-md shadow-md mx-2 relative">
            {/* Post Header */}
            {currentConcern && currentConcern.current_concern && (
              currentConcern && currentConcern.current_concern && currentConcern.current_concern?.data && (
                <>
                  <div className="flex items-center">
                    <img
                      src={image1}
                      alt="User Profile"
                      className="rounded-full h-10 w-10 mr-4"
                    />
                    <div>
                      <p className="font-semibold">
                        {currentConcern.current_concern.data.reportedBy.fullName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {currentConcern.current_concern.data.reportedBy.username}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="mt-4 font-bold text-lg">
                    {currentConcern.current_concern.data.title}
                  </p>
                  <p className="my-4">
                    {currentConcern.current_concern.data.description}
                  </p>

                  <div className="">
                    <div className="absolute right-4">
                      <p className="text-gray-600 text-sm right-3 bottom-4 my-3">
                        Published {moment(currentConcern.current_concern.data.createdAt).format('ll')}
                      </p>
                    </div>
                  </div>

                  {/* Replies */}
                  <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comments:</h3>
        {
          currentConcern && currentConcern.concern_comments && currentConcern.concern_comments.content &&(
            currentConcern?.concern_comments?.content.map((item,index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
              <p className="text-gray-700 font-bold">{item.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {item.postedBy.fullName} |  <span> {moment(item.createdAt).format('ll')} </span>
              </p>
            </div>
            ))
          )
          
          
        }
        {/* {replies.map((reply, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
            <p className="text-gray-700">{reply.message}</p>
            <p className="text-sm text-gray-500 mt-1">
              {reply.user} | {reply.date}
            </p>
          </div>
        ))} */}
      </div>

                  {/* Comment Form */}
                  {commentFormVisible && (
                    <div className="mt-4">
                      {
                        containHaras === true &&(
                          <div className="my-2 text-red-500 font-bold">Your comment contain harasment content</div>
                        )
                      }
                      <form onSubmit={handleSubmit(onSubmit)}>
                      <textarea
                        class={`text-sm sm:text-base placeholder-gray-500 pl-4 pr-3 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${errors.comment ? "border-red-500" : "border-sky-500"}`}
                        defaultValue={""}
                        {...register("comment")}
                        placeholder="Type your comment..."
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <input type="hidden"
                        {...register("concernUid")}
                      value={currentConcern.current_concern.data.uuid} />
                      <span className="text-red-500 text-sm">{errors.comment?.message}</span> <br />
                      <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        
                      >
                        Submit Comment
                      </button>
                      </form>
                    </div>
                  )}

                  {/* Like, Comment, Share */}
                  <div className="flex items-center mt-4">
                  {
                      userRole === "MP"? (
                        <>
                        </>
                      )
                      :  userRole === "MINISTER" ? (
                        <></>
                      )
                      :
                      <>
                     <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                      onClick={() => setCommentFormVisible(!commentFormVisible)}
                    >
                      <span className="bg-red-500">
                        <FaIcons.FaHeart className="text-red-500 text-lg" />
                      </span>
                      <span>Like</span>
                    </button>
                      </>
                    }
                   

                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4"
                      onClick={() => setCommentFormVisible(!commentFormVisible)}
                    >
                      <span>
                        <MdIcons.MdModeComment className="text-xl text-blue-600" />
                      </span>
                      <span>Comment</span>
                    </button>

                  </div>
                </>
              )
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

};

export default Forum;
