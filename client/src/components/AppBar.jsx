import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import AddForm from "./addForm";
import { AuthLogoutAction } from '../redux/actions/auth.action'

export default function MainAppBar() {
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    const handleClickOpen = () => {
        setModalOpen(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClickOpen}
                    >
                        <AddCircleIcon />
                    </IconButton>

                    <AddForm modalOpen={modalOpen} setModalOpen={setModalOpen} />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Realtor App
                    </Typography>
                    <Button color="inherit" onClick={() => dispatch(AuthLogoutAction())}>Выйти</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}