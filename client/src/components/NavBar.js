import React from 'react';
import { AppBar, Typography, Toolbar} from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{textDecoration: "none", color: "white"}} >
                    Ez Forum
                </Typography>
            </Toolbar>
        </AppBar>
     );
}
 
export default NavBar;