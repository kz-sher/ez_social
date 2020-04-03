import React, { useState } from 'react';
import { connect } from 'react-redux';
import ImagePlaceholder from '../images/image_placeholder.png';
import {  } from '../actions/post.action';
import { Form, Field } from 'formik';
import { 
    Grid, Typography, TextField, 
    Card, CardMedia, Button, ButtonGroup,
    useMediaQuery, FormHelperText
} from '@material-ui/core';
import { Publish, Clear } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1.5em',
        marginBottom: '1.5em',
    },
    card: {
        maxWidth: '100%',
        border: theme.border,
        [theme.breakpoints.down('md')]: {
          border: 'none',
        },
    },
    media: {
        height: 0,
        paddingTop: '75%',
    },
    inputGroup: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        '&:first-child': {
            marginTop: 0
        }
    },
    input: {
        display: 'none'
    }
}));

function PostForm({ 
    errors, 
    touched, 
    isSubmitting, 
    setFieldValue, 
}) {
    const sizeMatches = useMediaQuery('(min-width:600px)');
    const classes = useStyles();
    const [image, setImage] = useState(ImagePlaceholder);
    
    const handleClearImgInput = () => {
        setImage(ImagePlaceholder)
        setFieldValue('image', '');
    }

    const handleUpload = e => {
        console.log(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
        setFieldValue('image', e.target.files[0]);
    }

    return (
        <Grid className={classes.root} container item direction="row" justify="center" alignItems="flex-start" xs={12} sm={12}>
            <Grid item xs={12} sm={11}>
                <Form >
                    <Grid container item justify="center" alignItems="center">
                        <Grid className={classes.inputGroup} item xs={11} sm={7}>
                            <Typography variant="h6">Preview:</Typography>
                        </Grid>
                        <Grid item xs={11} sm={7}>
                            <Card className={classes.card} variant="outlined">
                                <CardMedia
                                    className={classes.media}
                                    image={image}
                                />
                            </Card>
                            <FormHelperText error>
                                {!!touched.image && !!errors.image && errors.image}
                            </FormHelperText>
                        </Grid>

                        <Grid className={classes.inputGroup} item xs={11} sm={7}>
                            <ButtonGroup fullWidth>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    size={sizeMatches?'large':'small'}
                                    component="label"
                                    startIcon={<Publish />}
                                >
                                    Upload
                                    <input type='file' name='image' className={classes.input} onChange={handleUpload}/>
                                    
                                </Button>
                                <Button
                                    variant="contained"
                                    color="default"
                                    size={sizeMatches?'large':'small'}
                                    className={classes.button}
                                    onClick={handleClearImgInput}
                                    startIcon={<Clear />}
                                >
                                    Clear
                                </Button>
                            </ButtonGroup>
                        </Grid>
            
                        <Grid className={classes.inputGroup} item xs={11} sm={7}>
                            <Typography variant="h6">Description:</Typography>
                        </Grid>
                    
                        <Grid item xs={11} sm={7}>
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

const mapStateToProps = state => {
    return {
        postImg: state.post.postImg,
    }
}

export default connect(mapStateToProps, {
        
})(PostForm)
