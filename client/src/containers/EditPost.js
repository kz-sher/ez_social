import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFormik} from 'formik';

import { getPost, updatePost } from '../actions/post.action';
import { Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
    Grid, Typography, TextField, 
    Card, CardMedia, Button,
    useMediaQuery, FormHelperText,
    LinearProgress
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PostSkeletonWithButton from '../components/PostSkeletonWithButton'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginBottom: '1.5em',
        position: 'relative',
        height: '100%',
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
            marginTop: '1.5em'
        }
    },
    input: {
        display: 'none'
    },
    loading: {
        width: '100%',
        position: 'absolute',
        top: 0
    }
}));

const EditPost = ({ 
    errors, 
    touched, 
    isSubmitting, 
    match,
    post,
    postLoading,
    getPost,
    handleSubmit
}) => {
    
    useEffect(() => {
        getPost(match.params.id)
    }, [match])

    const classes = useStyles();
    
    return (
        <Grid className={classes.root} container item direction="row" justify="center" alignItems="flex-start" xs={12} sm={6}>
            {isSubmitting && <LinearProgress className={classes.loading} />}
            { postLoading &&
                <PostSkeletonWithButton />
            }
            { !postLoading &&
            <Grid item xs={12} sm={12}>
                <Form >
                    <Grid container item justify="center" alignItems="center">
                        <Grid className={classes.inputGroup} item xs={11} sm={12}>
                            <Typography variant="h6">Image:</Typography>
                        </Grid>
                        <Grid item xs={11} sm={12}>
                            <Card className={classes.card} variant="outlined">
                                <CardMedia
                                    className={classes.media}
                                    image={post.image.url}
                                />
                            </Card>
                        </Grid>
            
                        <Grid className={classes.inputGroup} item xs={11} sm={12}>
                            <Typography variant="h6">Description:</Typography>
                        </Grid>
                    
                        <Grid item xs={11} sm={12}>
                            <Field
                            type="text"
                            name="description"
                            placeholder={post.description}
                            variant="outlined"
                            multiline
                            rows="8"
                            as={TextField} 
                            error={!!touched.description && !!errors.description}
                            helperText={!!touched.description && !!errors.description && errors.description}
                            fullWidth/>
                        </Grid>

                        <Grid className={classes.inputGroup} item xs={11} sm={12}>
                            <Button
                            variant="contained"
                            color="default"
                            size='large'
                            startIcon={<Save />}
                            onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                        </Grid>

                    </Grid>
                </Form>
            </Grid>
            }
        </Grid>
)}

const initialValues = {
    description: ''
}

const FormikForEditPost = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    validationSchema: Yup.object().shape({
        description: Yup.string().required('Description has not changed yet')
    }),
    handleSubmit: (values, {props, setSubmitting}) => {
      const { updatePost } = props;
      updatePost({ 
          description: values.description,
          postId: props.match.params.id,
          history: props.history,
          setSubmitting 
      });
    }
  });

  const mapStateToProps = state => {
    return {
        post: state.post.post,
        postLoading: state.post.postLoading
    }
  }
  
  export default compose(
    connect(mapStateToProps, { getPost, updatePost }),
    FormikForEditPost
    )(EditPost);
