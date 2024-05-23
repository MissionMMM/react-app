import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function InfoAlert({ alertOpen, alertText, handleClose }) {
    React.useEffect(() => {
        // console.log('我是传入参数alertOpen：', alertOpen)
        // console.log('我是传入参数alertText：', alertText)
        // console.log('我是传入参数alertType：', alertType)
    })
    return (
        <Snackbar open={alertOpen} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            <Alert severity="info">
                {alertText}
            </Alert>
        </Snackbar>
    );
}

export default InfoAlert