import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Add, EditNote, CallToAction, MoreVert } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteMinistry, getAllMinstries, getMinistryById} from "../store/actions/ministry_actions";
import RegisterMinistry from "./RegisterMinistry";
import AssignMinister from "./AssignMinister";
import { getAllStaffs } from "../store/actions/users_actions";

const columns = [
    { field: 'name', headerName: 'Ministry', width: 400 },
    { field: 'shortCode', headerName: 'Code', width: 200 },

    {
        field: 'constituent',
        headerName: 'Minister',
        width: 200,
        valueGetter: (params) => params.row.minister?.fullName || '',
    },
    {
        field: 'uuid',
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

function MoreActionsButton({ uuid }) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [modalPosition, setModalPosition] = React.useState({ top: 0, left: 0 });
    const dispatch = useDispatch();

    const officials = useSelector(state => state.users);

    const handleOpenModal = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.bottom, left: rect.left });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
        dispatch(getMinistryById(uuid));
        setTimeout(() => {
            dispatch(getAllStaffs());
        }, 1000);
        handleCloseModal();
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
        handleCloseModal();
    };

    const handleConfirmDelete = () => {
        // Implement delete logic here
        console.log('Confirmed delete for uuid:', uuid);

        dispatch( deleteMinistry(uuid) )

        setTimeout(() =>{
            getAllMinstries();
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
                    <Button startIcon={<EditIcon />} sx={{ mb: 1 }} onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Button startIcon={<DeleteIcon />} onClick={handleDeleteClick}>Delete</Button>
                </Box>
            </Modal>
            <EditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} uuid={uuid} />
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

function EditModal({ open, onClose, uuid }) {
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

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
        >
            <Box sx={style}>
                <AssignMinister />
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


export default function MinistryData({ openForm }) {
    const dispatch = useDispatch();
    const [reload, setReload] = useState(0);
    const all_ministries = useSelector(state => state.ministries);
    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        if (all_ministries && all_ministries.ministries && all_ministries.ministries.length < 1 && reload <= 2) {
            dispatch(getAllMinstries());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const rows = all_ministries?.ministries?.content || [];

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid my={2} container justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5" component="div" sx={{ color: 'blue', fontWeight: 'bold' }}>
                        Registered Ministries
                    </Typography>
                </Grid>
                <Grid item>
                    <Button startIcon={<Add />} variant="contained" color="primary" onClick={handleOpenAddModal}>
                        Add Ministry
                    </Button>
                </Grid>
            </Grid>
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
                    <RegisterMinistry />
                </Box>
            </Modal>
        </Container>
    );
}
