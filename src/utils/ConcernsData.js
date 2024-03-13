import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { SendSharp, ReadMore, CallToAction, MoreVert } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Dialog, DialogFooter, Typography,Select, MenuItem} from "@material-tailwind/react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import {Alert, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {getConcernById, getConcernComments, getMyConcerns, getSubmitteToMp} from "../store/actions/concern_actions";
import {assignMinister, getAllMinstries, getMinistryById} from "../store/actions/ministry_actions";
import {getAllAssistants, getAllStaffs} from "../store/actions/users_actions";
import QuestionDetail from "../components/QuestionDetail";
import Intermediate from "../components/Intermediate";
import * as MdIcons from "react-icons/md";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ForwardConcern from "./FowardConcern";
import {BiSend} from "react-icons/bi";
import AssignTask from "./AssignTask";

const columns = [
    { field: 'firstName', headerName: 'Name', width: 200,
        valueGetter: (params) => params.row.reportedBy?.fullName || '',
    },

    { field: 'reportedBy', headerName: 'Usernamme', width: 200,
        valueGetter: (params) => params.row.reportedBy?.username || '',
    },
    { field: 'concernCategory', headerName: 'Category', width: 200,
        valueGetter: (params) => params.row.concernCategory?.categoryName || '',
    },
    { field: 'submittedTo', headerName: 'Sent To', width: 200,
        valueGetter: (params) => params.row.submittedTo?.fullName || '',
    },
    { field: 'progressStatus', headerName: 'Status', width: 200 },
    {
        field: 'col6',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
            <Grid container flexDirection="horizontal" justifyContent="space-between">
                <Grid item>
                    <MoreActionsButton  uuid={params.row.uuid} category={params.row.title} />
                </Grid>
            </Grid>
        ),
    },
];


const Schema = Yup.object({
    concernUuid: Yup.string().required().trim(),
    ministryUuid : Yup.string().required().trim()
    // Uncomment the following lines if you want to include password and confirm password fields
    // password: Yup.string().required().min(6),
    // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});


function MoreActionsButton({ uuid,category }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [forwardModalOpen, setForwardModalOpen] = useState(false);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleOpenModal = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.bottom, left: rect.left });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleViewClick = () => {
        dispatch(getConcernById(uuid));
        dispatch(getAllStaffs());
        dispatch(getConcernComments(uuid));
        navigate("/forum");
        handleCloseModal();
    };

    const handleForwardClick = () => {
        dispatch(getAllMinstries());
        // console.log( "CONCERN  :", uuid)
        setForwardModalOpen(true);
        handleCloseModal();
    };

    const handleAssignClick = () => {
        dispatch(getAllAssistants());
        // console.log( "CONCERN  :", uuid)
        setAssignModalOpen(true);
        handleCloseModal();
    };

    const handleCloseForwardModal = () => {
        setForwardModalOpen(false);
        setAssignModalOpen(false)
    };


    return (
        <React.Fragment>
            <IconButton
                sx={{ background: 'white', color: 'blue', pr: 1 }}
                color="primary"
                aria-label="more actions"
                onClick={handleOpenModal}
            >
                <MoreVert />
            </IconButton>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                style={{
                    top: modalPosition.top,
                    left: modalPosition.left,
                    position: 'absolute',
                }}
            >
                <Box sx={{ width: 200, bgcolor: 'background.paper', p: 2 }}>
                    <Button startIcon={<SendSharp />} sx={{ mb: 1 }} onClick={handleForwardClick}>Forward</Button>
                    <Button startIcon={<BiSend />} sx={{ mb: 1 }} onClick={handleAssignClick}>Assign</Button>
                    <Button startIcon={<ReadMore />} onClick={handleViewClick}>Read More</Button>
                </Box>
            </Modal>
            <ForwardModal open={forwardModalOpen} onClose={handleCloseForwardModal} uuid={uuid} category={category} />
            <AssignModal open={assignModalOpen} onClose={handleCloseForwardModal} uuid={uuid} category={category} />
        </React.Fragment>
    );
}

function ForwardModal({ open, onClose, uuid, category }) {
    // Implement the logic for the Forward modal

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="forward-modal-title"
            aria-describedby="forward-modal-description"
        >
            <Box sx={style} >
                <ForwardConcern uuid={uuid} category={category} />
            </Box>

        </Modal>
    );
}

function AssignModal({ open, onClose, uuid, category }) {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="forward-modal-title"
            aria-describedby="forward-modal-description"
        >
            <Box sx={style} >
                <AssignTask uuid={uuid} category={category} />
            </Box>

        </Modal>
    );
}



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
export default function ConcernsData({ openForm }) {
    const dispatch = useDispatch();
    const [reload, setReload] = useState(0);
    const concerns = useSelector(state => state.concerns);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (id) => {
        dispatch(getConcernById(id))
        dispatch(getAllStaffs())
        setTimeout(() => {
            setModalIsOpen(true);
        }, 2000);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // console.log(concerns.submitted_to_me);

    useEffect(() => {
        if (concerns && concerns.submitted_to_me && concerns.submitted_to_me.length < 1 && reload <= 2) {
            dispatch(getSubmitteToMp());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const rows = concerns?.submitted_to_me?.content || [];


    const handleOpen = (id) =>{
        // setOpen(!open);
        dispatch(getConcernById(id))
        setTimeout(() => {
            dispatch(getAllStaffs());
            dispatch(getConcernComments(id))
        }, 1000);
        navigate("/forum");
    }

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid my={2} container justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5" component="div" sx={{color: 'blue', fontWeight: 'bold'}}>
                        Concerns Received
                    </Typography>
                </Grid>
                <Grid item>
                    {/*<Button startIcon={<Add />} variant="contained" color="primary" onClick={() => openForm()}>*/}
                    {/*    Add User*/}
                    {/*</Button>*/}
                </Grid>
            </Grid>
            {/* Check if rows is an array before rendering DataGrid */}
            {Array.isArray(rows) && (
                <DataGrid rows={rows} columns={columns}/>
            )}


</Container>
)
    ;
}
