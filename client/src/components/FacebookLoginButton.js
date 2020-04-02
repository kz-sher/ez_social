import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    socialMediaLink: {
        textDecoration: 'none',
        color: 'white',
    },
}));

export default function FacebookLoginButton() {
    const classes = useStyles();
    return (
        <a className={classes.socialMediaLink} href="/api/auth/oauth/facebook">
            <Button
                size="large"
                variant="contained"
                fullWidth
                color="primary"
                startIcon={<FontAwesomeIcon icon={faFacebook}/>}>
                    Facebook
            </Button>
        </a>
    )
}
