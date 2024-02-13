import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {deleteUser, getAllConstituency, getAllStaffs} from "../store/actions/users_actions";
import { Add, EditNote, CallToAction, MoreVert } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteMinistry, getAllMinstries} from "../store/actions/ministry_actions";
import RegisterMinistry from "./RegisterMinistry";
import SignUp from "../components/SignUp";
import RegisterMP from "../components/RegisterMp";

const columns = [
    { field: 'firstName', headerName: 'Firstname', width: 200 },
    { field: 'lastName', headerName: 'Lastname', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'phone', headerName: 'Telephone', width: 200 },
    {
        field: 'constituent',
        headerName: 'Constituent',
        width: 200,
        valueGetter: (params) => params.row.constituent?.constituentName || '',
    },
    {
        field: 'col6',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
            <Grid container flexDirection="horizontal" justifyContent="space-between">
                <Grid item>
                    <MoreActionsButton uuid={params.row.uuid} />
                </Grid>
            </Grid>
        ),
    },
];

function MoreActionsButton({uuid}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 });
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const dispatch = useDispatch();



    const handleOpenModal = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.bottom, left: rect.left });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
        handleCloseModal();
    };

    const handleConfirmDelete = () => {
        dispatch( deleteUser(uuid) )

        setTimeout(() =>{
            window.location.reload();
            handleCloseDeleteModal();
        },1000)

    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
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
                    {/*<Button startIcon={<EditIcon />} sx={{ mb: 1 }} onClick={handleCloseModal}>Edit</Button>*/}
                    <Button startIcon={<DeleteIcon />} onClick={handleDeleteClick}>Delete</Button>
                </Box>
            </Modal>
            <DeleteModal open={deleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
        </React.Fragment>
    );
}


function DeleteModal({ open, onClose, onConfirm }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center items horizontally
                justifyContent: 'center', // Center items vertically
                textAlign: 'center', // Center text
            }}>

                <Box sx={[style, { pl: 10 }]}>

                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 6 }}>
                        Are you sure you want to delete?
                    </Typography>
                    <Button onClick={onConfirm} variant="contained" color="error" sx={{ mr: 2, mt:4 }}>
                        Delete
                    </Button>
                    <Button onClick={onClose} variant="outlined"  sx={{ mt : 4}} >
                        Cancel
                    </Button>
                </Box>
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

export default function UsersData({ openForm }) {
    const dispatch = useDispatch();
    const [reload, setReload] = useState(0);
    const all_users = useSelector(state => state.users);
    const navigate = useNavigate();
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        if (all_users && all_users.staffs && all_users.staffs.length < 1 && reload <= 2) {
            dispatch(getAllStaffs());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const rows = all_users?.staffs?.content || [];

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
        dispatch(getAllConstituency())
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid my={2} container justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5" component="div" sx={{ color: 'blue', fontWeight: 'bold' }}>
                        Registered Users
                    </Typography>
                </Grid>
                <Grid item>
                    <Button startIcon={<Add />} variant="contained" color="primary" onClick={handleOpenAddModal}>
                        Add User
                    </Button>
                </Grid>
            </Grid>
            {/* Check if rows is an array before rendering DataGrid */}
            {Array.isArray(rows) && (
                <DataGrid rows={rows} columns={columns} />
            )}


            <Modal
                open={addModalOpen}
                onClose={handleCloseAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <RegisterMP />
                </Box>
            </Modal>
        </Container>
    );
}
