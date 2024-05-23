import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function ErrorAlert({ alertOpen, alertText, handleClose }) {
    React.useEffect(() => {
    })
    return (
        <Snackbar open={alertOpen} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            <Alert severity="error">
                {alertText}
            </Alert>
        </Snackbar>
    );
}

export default ErrorAlert