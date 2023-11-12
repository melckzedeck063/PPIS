import React, { useState } from 'react'


import Modal from 'react-modal';
import image1 from '../assets/image2.jpg';
import Login from './Login';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Index() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
        <section class="relative  bg-bluee-500">
<div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">

<div
  className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
  style={{
    backgroundImage: `url(${image1})`,
    
  }}
></div>



        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  Your story starts with us.
                </h1>
                <p class="mt-4 text-lg text-gray-200">
                  This is a simple example of a Landing Page you can build using
                  Notus JS. It features multiple CSS components based on the
                  Tailwind CSS design system.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0px)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div> */}
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
                  <h6 class="text-xl font-semibold">Awarded Agency</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Divide details about your product or agency work into parts.
                    A paragraph describing a feature will be enough.
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <i class="fas fa-retweet"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Free Revisions</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Keep you user engaged by providing meaningful information.
                    Remember that by this time, the user is curious.
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
                  <h6 class="text-xl font-semibold">Verified Company</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative container">
              <button
                onClick={openModal}
                className="mx-auto w-28 h-8 py-1 text-center bg-sky-600 text-white rounded-lg hover:cursor-pointer hover:bg-green-600"
              >
                Get Started
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <Login />
              <div className="absolute top-1 right-4 bg-red-500">

              <button onClick={closeModal}>Close Modal</button>
              </div>
            </Modal>


           <footer class="relative  pt-8 pb-6 mt-1">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="text-sm text-sky-600 font-semibold py-1">
          Made with <a href="https://react.dev/" class="text-sky-600 hover:text-green-600" target="_blank">React JS</a> by <a href="https://melckzedeck-blog.vercel.app/" class="text-sky-600 hover:text-blueGray-800" target="_blank"> Melckzedeck</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
      </section>
      </section>
    </div>
  )
}
