import React, { useState, forwardRef } from 'react';

import clsx from 'clsx';
import { getFormattedDate } from '../utils';

import {
  Grid, Fade, Card,
  CardHeader, CardMedia, CardContent,
  CardActions, Collapse, Avatar,
  IconButton, Typography
} from '@material-ui/core';
import {
  Favorite, //Share,
  ExpandMore,// MoreVert
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
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
    },
    card: {
      maxWidth: '100%',
      border: theme.border,
      [theme.breakpoints.down('sm')]: {
        border: 'none',
      },
    },
    media: {
      height: 0,
      paddingTop: '75%', // 4:3
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
    fav: {
      '&:hover':{
        color: red[200],
      }
    }
  }));

const Post = forwardRef(({ post }, ref) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [color, setColor] = useState('default');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFavClick = () => {
      setColor('secondary')
    }
    return ( 
          <Grid ref={ref} className={classes.root} item xs={12}>
            <Card className={classes.card} variant="outlined">
                <CardHeader
                avatar={
                    <Avatar aria-label="username" className={classes.avatar}>
                    {post.author[0].toUpperCase()}
                    </Avatar>
                }
                title={post.author}
                subheader={getFormattedDate(post.date)}
                />
                <CardMedia
                className={classes.media}
                image={'http://localhost:4000/static/' + post.image.filename}
                />
                <CardActions disableSpacing>
                  <IconButton className={classes.fav} onClick={handleFavClick} color={color}>
                      <Favorite />
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
                        {post.description}
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