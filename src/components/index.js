import React, { useState } from 'react'



import image1 from '../assets/image2.jpg';
import Login from './Login';
import { StickyNavbar } from './StickyNavbar';
import bg_image from "../assets/knjaro.jpg";



export default function Index() {

  return (
    <div>
      <StickyNavbar  />

      <div
          style={{
            width: '100vw',
            height: '100vh',
            background: `url(${bg_image}) center/cover no-repeat`, // Replace with your image path
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 10,
            position: 'relative', // Needed for absolute positioning of children
          }}
      >
        <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0 0.7)', // Adjust the alpha value for transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >


        <section class="relative  bg-bluee-500">

<div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">






        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-4xl">
                  Get Connected
                </h1>
                <p class="mt-4 text-lg text-gray-200">
                   Hello This is an Information System for enhancing interactivity
                  between Members of Parliament and Citizens that would enable
                  Citizens to communicate directly with their elected representatives.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <section class="pb-10 bg-blueGray-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Concern or Challenges</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    The system allows users or citizens to present their concern
                    or challenges on specific issues to their elected representatives.
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                    <i class="fas fa-retweet"></i>
                  </div>
                  <h6 class="text-xl font-semibold">QA</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Our system enable users to communnicate directly to their
                    elected representatives by asking  questions and receive
                    direct answers.
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Progress Tracking</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Our system provide allow users to track progress of
                    their enqueries until they receive a response from their elected
                    representatives
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="relative container">
              <button
                onClick={openModal}
                className="mx-auto w-28 h-8 py-1 text-center bg-sky-600 text-white rounded-lg hover:cursor-pointer hover:bg-green-600"
              >
                Get Started
              </button>
            </div> */}


           <footer class="relative  pt-8 pb-6 mt-1">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      {/* <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="text-sm text-sky-600 font-semibold py-1">
          Made with <a href="https://react.dev/" class="text-sky-600 hover:text-green-600" target="_blank">React JS</a> by <a href="https://melckzedeck-blog.vercel.app/" class="text-sky-600 hover:text-blueGray-800" target="_blank"> Melckzedeck</a>.
        </div>
      </div> */}
    </div>
  </div>
</footer>
</div>
      </section>
      </section>
    </div>
      </div>
    </div>
  )
}
