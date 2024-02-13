// ForwardModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, Select, MenuItem } from '@mui/material';
import { SendSharp } from '@mui/icons-material';
import { forwardConcern } from '../store/actions/concern_actions';

const ForwardModal = ({ open, onClose, uuid }) => {
    const dispatch = useDispatch();
    const [selectedRecipient, setSelectedRecipient] = useState('');

    const handleForward = () => {
        // Forward the concern to the selected recipient
        dispatch(forwardConcern(uuid, selectedRecipient));
        onClose(); // Close the modal after forwarding
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ width: 300, bgcolor: 'background.paper', p: 2 }}>
                <Select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    fullWidth
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Select recipient
                    </MenuItem>
                    {/* Replace options with actual recipient data */}
                    <MenuItem value="recipient1">Recipient 1</MenuItem>
                    <MenuItem value="recipient2">Recipient 2</MenuItem>
                    {/* Add more recipients as needed */}
                </Select>
                <Button
                    startIcon={<SendSharp />}
                    sx={{ mt: 2 }}
                    onClick={handleForward}
                    disabled={!selectedRecipient}
                >
                    Forward
                </Button>
            </Box>
        </Modal>
    );
};

export default ForwardModal;
