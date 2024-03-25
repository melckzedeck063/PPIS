import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SideNav from "../components/sidebar/SideNav";
import NavBar from "../components/sidebar/NavBar";

import Modal from "react-modal";
import RegisterMP from "../components/RegisterMp";
import ConcernsData from "../utils/ConcernsData";
import AuthUser from "../context/authUser";
import MinistryConcerns from "../utils/MinistryConcerns";
import SecretaryConcerns from "../utils/SecretaryConcerns";
import Button from "@mui/material/Button";
import {BsUnlock} from "react-icons/bs";
import {LockClosedIcon} from "@heroicons/react/16/solid";
import PrivateConcerns from "./PrivateConcerns";

const defaultTheme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MyConcerns(props) {

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [currentType, setCurrentType] = useState('public');

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

    const handlePublicButtonClick = () => {
        setCurrentType('public');
    };

    const handlePrivateButtonClick = () => {
        setCurrentType('private');
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box className="bg-gray-200" sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <SideNav />
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <NavBar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{p: 4}}>

                                    <Grid my={2} container justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold'}}>
                                                Concerns Received
                                            </Typography>
                                        </Grid>

                                        {
                                            userRole === "MP" && (
                                                <Grid item>
                                                    <Button
                                                        startIcon={<BsUnlock />}
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handlePublicButtonClick}
                                                        disabled={currentType === 'public'}
                                                    >
                                                        Public
                                                    </Button>

                                                    {/* Button to filter private concerns */}
                                                    <Button
                                                        sx={{ marginX: 2 }}
                                                        startIcon={<LockClosedIcon />}
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handlePrivateButtonClick}
                                                        disabled={currentType === 'private'}
                                                    >
                                                        Private
                                                    </Button>
                                                </Grid>
                                            )
                                        }

                                    </Grid>

                                    <div>

                                        <Modal
                                            open={openModal}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <RegisterMP />
                                            </Box>
                                        </Modal>
                                    </div>


                                    <Box sx={{mt: 2}}>

                                        {
                                            userRole === "MINISTER"? (
                                                <MinistryConcerns />
                                            )
                                            :
                                            userRole === "SECRETARY" ?(
                                                <SecretaryConcerns  />
                                                )

                                            :
                                            <>
                                            {
                                                currentType === "public"?  <ConcernsData  openForm={handleOpen}/> : <PrivateConcerns openForm={handleOpen} />
                                            }

                                            </>
                                        }

                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Box sx={{pt: 4, pb: 2}}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" href="https://mui.com/">
                                www.ega.go.tz
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MyConcerns;
