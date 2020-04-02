import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    socialMediaLink: {
        textDecoration: 'none',
        color: 'white',
    },
}));

export default function GoogleLoginButton() {
    const classes = useStyles();
    return (
        <a className={classes.socialMediaLink} href="/api/auth/oauth/google">
            <Button
                size="large"
                variant="contained"
                fullWidth
                color="secondary"
                startIcon={<FontAwesomeIcon icon={faGoogle}/>}>
                    Google
            </Button>
        </a>
    )
}
