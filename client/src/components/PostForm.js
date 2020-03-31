import React from 'react'

import { Form, Field } from 'formik';
import { Grid, Typography, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1.5em',
    },
}));

function PostForm({ errors, touched, isSubmitting}) {
    
    const classes = useStyles();

    return (
        <Grid className={classes.root} container item direction="row" justify="center" alignItems="flex-start" xs={12} sm={12} spacing={0}>
            <Grid item xs={12} sm={12}>
                <Form >
                    <Grid container item justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={11} sm={6}>
                            <Typography variant="h6">Title:</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={11} sm={6}>
                            <Field
                            type="input"
                            name="title"
                            placeholder="Your post title goes here ..."
                            variant="outlined"
                            as={TextField} 
                            error={!!touched.title && !!errors.title}
                            helperText={!!touched.title && !!errors.title && errors.title}
                            fullWidth/>
                        </Grid>
                    </Grid>
                    
                    <Grid container item justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={11} sm={6}>
                            <Typography variant="h6">Description:</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" alignItems="center" spacing={3}>
                        <Grid item xs={11} sm={6}>
                            <Field
                            type="text"
                            name="description"
                            placeholder="Your post description goes here ..."
                            variant="outlined"
                            multiline
                            rows="8"
                            as={TextField} 
                            error={!!touched.description && !!errors.description}
                            helperText={!!touched.description && !!errors.description && errors.description}
                            fullWidth/>
                        </Grid>
                    </Grid>
                </Form>
            </Grid>
        </Grid>
    )
}

export default PostForm
