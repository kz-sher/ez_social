import React, { forwardRef } from 'react';

import clsx from 'clsx';
import { getFormattedDate } from '../utils';

import {
  Grid, Fade, Card,
  CardHeader, CardMedia, CardContent,
  CardActions, Collapse, Avatar,
  IconButton, Typography
} from '@material-ui/core';
import {
  Favorite, Share,
  ExpandMore, MoreVert
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: props => ({
      width: "100%",
      marginTop: '3em',
      [theme.breakpoints.down('md')]: {
        marginTop: '0.5em',
      },
      '&:last-child':{
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
          marginBottom: '0.5em',
        }
      },
    }),
    card: {
      maxWidth: '100%',
      border: theme.border,
      [theme.breakpoints.down('md')]: {
        border: 'none',
      },
    },
    media: {
      height: 0,
      paddingTop: '75%', // '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const Post = forwardRef(({ post, image }, ref) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return ( 
          <Grid ref={ref} className={classes.root} item xs={12} sm={6}>
            <Card className={classes.card} variant="outlined">
                <CardHeader
                avatar={
                    <Avatar aria-label="username" className={classes.avatar}>
                    {post.author[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    <MoreVert />
                    </IconButton>
                }
                title={post.author}
                subheader={getFormattedDate(post.date)}
                />
                <CardMedia
                className={classes.media}
                image={image}
                // title="Paella dish"
                />
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                      <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                      <Share />
                  </IconButton>
                  { !expanded &&
                  <IconButton
                      className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                  >
                      <ExpandMore />
                  </IconButton>
                  }
                </CardActions>
                { !expanded &&
                <CardContent>  
                  <Fade in={true}>
                    <Typography noWrap>
                        {post.title}
                    </Typography>
                  </Fade>
                </CardContent>
                }
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                      <Typography paragraph>
                        {post.description}
                      </Typography>
                  </CardContent>
                </Collapse>
            </Card>
          </Grid>
     );
})
 
export default Post;