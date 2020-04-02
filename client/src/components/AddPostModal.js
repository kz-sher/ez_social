import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createPost, togglePostModal } from '../actions/post.action';

import { withFormik} from 'formik';
import * as Yup from 'yup';

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
  modalOpen,
  togglePostModal,
  handleSubmit,
  handleReset
}) => {

  const classes = useStyles();
  const handleTogglePostModal = () => {
    handleReset()
    togglePostModal()
  }

  return (
    <Dialog fullScreen open={modalOpen} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleTogglePostModal} aria-label="close">
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
    const { createPost } = props;
    createPost({ postData: values, resetForm, setErrors, setSubmitting });
  }
});

const mapStateToProps = state => {
  return {
      modalOpen: state.post.modalOpen
  }
}

export default compose(
  connect(mapStateToProps, { createPost, togglePostModal }),
  FormikForAddPostModal
  )(AddPostModal);