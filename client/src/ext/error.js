import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";

const ErrorMsg = () => {
    const error = useSelector(state => state.auth.error)
    return (
        <Stack sx={{
            position: "absolute", zIndex: 2, left: 0,
            right: 0, top: 20,
            margin: "0 auto", maxWidth: 360
        }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        </Stack>

    )
}
export default ErrorMsg