import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import { withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Dialog, Typography, AppBar, Toolbar, IconButton, Button, Slide} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PostForm from './PostForm';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPostModal = ({
  errors,
  touched,
  isSubmitting,
  open,
  setPostModalDisplay,
  handleSubmit
}) => {

  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setPostModalDisplay()} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <Button
              edge="end"
              color="inherit"
              onClick={handleSubmit}
              >
              Post
          </Button>
        </Toolbar>
      </AppBar>
      <PostForm errors={errors} touched={touched} isSubmitting={isSubmitting} />
    </Dialog>
  );
}

const initialValues = {
  title: '',
  description: ''
}

const FormikForAddPostModal = withFormik({
  mapPropsToValues: () => {
    return initialValues
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required()
  }),
  handleSubmit: async (values, {props, resetForm, setErrors, setSubmitting}) => {
    const { openAlert, setPostModalDisplay, addNewPost } = props;
    await axios.post('http://localhost:4000/api/post/create', values).then(
      ({ data }) => {
          if(data.POST_OK){
            resetForm();
            setPostModalDisplay();
            setTimeout( () => {
              openAlert({
                  status: 'success',
                  msg: data.message
              })
            }, 100);
            getNewPostWithAct(addNewPost);
          } 
          else{
              setErrors(data.formErrors);
          }
      },
      ({ response })=>{
          openAlert({
            status: 'error',
            msg: !response ? 'Server error occured' : response.data.message
          })  
      });
    setSubmitting(false);
  }
});

const getNewPostWithAct = async (setStorePost) => {
  await axios.get('http://localhost:4000/api/post/create').then(
      ({ data }) => {
          setStorePost(data)
      },
      ({ response }) => {
          console.log("response from 400 getposts");
          console.log(response)
      });
}

const mapStateToProps = state => {
  return {
      open: state.post.open
  }
}

export default compose(
  connect(mapStateToProps, actions),
  FormikForAddPostModal
  )(AddPostModal);