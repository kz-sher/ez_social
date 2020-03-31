import React from 'react'
import { Button } from '@material-ui/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FacebookLoginButton() {
    return (
        <a className="social-media-link" href="/api/auth/oauth/facebook">
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
