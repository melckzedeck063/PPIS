import React, { useState } from 'react';

import image1 from '../assets/image2.jpg';
import SideNav from './sidebar/SideNav';
import NavBar from './sidebar/NavBar';
import { useSelector } from 'react-redux';
import moment from 'moment';

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

const Forum = () => {
    const currentConcern = useSelector((state) => state.concerns);
    const [commentFormVisible, setCommentFormVisible] = useState(false);
    const [comment, setComment] = useState('');
  
    const handleCommentSubmit = () => {
      // Handle comment submission logic here
      console.log('Comment submitted:', comment);
      // Reset comment state and hide the form
      setComment('');
      setCommentFormVisible(false);
    };
  
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
  
                    {/* Comment Form */}
                    {commentFormVisible && (
                      <div className="mt-4">
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Type your comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                          onClick={handleCommentSubmit}
                        >
                          Submit Comment
                        </button>
                      </div>
                    )}
  
                    {/* Like, Comment, Share */}
                    <div className="flex items-center mt-4">
                      <button
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                        onClick={() => setCommentFormVisible(!commentFormVisible)}
                      >
                        <span className="bg-red-500">
                          <FaIcons.FaHeart className="text-red-500 text-lg" />
                        </span>
                        <span>Like</span>
                      </button>
  
                      <button
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4"
                        onClick={() => setCommentFormVisible(!commentFormVisible)}
                      >
                        <span>
                          <MdIcons.MdModeComment className="text-xl text-blue-600" />
                        </span>
                        <span>Comment</span>
                      </button>
  
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 ml-4">
                        <span className="">
                          <FaIcons.FaShareAlt className="text-lg text-green-600" />
                        </span>
                        <span>Share</span>
                      </button>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Forum;
