import React from 'react'
import { Button } from '@material-ui/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function GoogleLoginButton() {
    return (
        <a className="social-media-link" href="/api/auth/oauth/google">
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
