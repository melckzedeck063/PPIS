import React,{useState} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

import Login from "./Login";
import * as MdIcons from 'react-icons/md';
import SignUp from "./SignUp";
import Modal from 'react-modal';
Modal.setAppElement('#root');
 
export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const [signUpModal,setSignupModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

const openSignupModal = () =>{
      setSignupModal(true)
}

const closeSignupModal =()=>{
  setSignupModal(false);
}
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-3" style={{border:'none'}}>
        <div className="flex items-center justify-between text-blue-900 pt-4">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1 font-bold text-3xl pt-1"
          >
            PPIS
          </Typography>
          <div className="flex items-center gap-4">
            {/* <div className="mr-4 hidden lg:block">{navList}</div> */}
            <div className="flex items-center gap-x-1">
              <Button
                  onClick={openModal}
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                  onClick={openSignupModal}
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block bg-blue-500"
              >
                <span>Sign Up</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 mr-5 -mt-4 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {/* {navList} */}
          <div className="flex items-center gap-x-1">
            <Button   onClick={openModal}
               fullWidth variant="text" size="sm" className="text-blue-800">
              <span>Log In</span>
            </Button>
            <Button 
                onClick={openSignupModal}
               fullWidth variant="gradient" size="sm" className="text-blue-500">
              <span>Sign Up</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      
         <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <Login />
              {/* <SignUp /> */}
              <div className="absolute top-6 right-6 bg-red-500 rounded-full">
                <span   onClick={closeModal} className=" text-white text-3xl font-bold cursor-pointer">
                  <MdIcons.MdOutlineCancel  />
                </span>
              </div>
            </Modal>

            <Modal
              isOpen={signUpModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              {/* <Login /> */}
              <SignUp />
              <div className="absolute top-6 right-6 bg-red-500 rounded-full">
                <span   onClick={closeSignupModal} className=" text-white text-3xl font-bold cursor-pointer">
                  <MdIcons.MdOutlineCancel  />
                </span>
              </div>
            </Modal>
    </div>
  );
}