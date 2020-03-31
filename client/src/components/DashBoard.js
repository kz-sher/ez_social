import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Post from './Post';

const DashBoard = () => {
  
    return ( 
        <Grid container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={12}>            
            <Post image="https://www.mcdonalds.com.my/storage/articles/a98065885e450163a415a09ad3e18c1c.jpg" />
            <Post image="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2019/06/28/9549b594-97ef-11e9-b82d-cb52a89d5dff_image_hires_193511.jpg?itok=HWrUULJE&v=1561721731" />
        </Grid>
     );
}
 
export default DashBoard;