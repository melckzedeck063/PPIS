import React from 'react';
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
                                        <ConcernsData  openForm={handleOpen}/>
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
