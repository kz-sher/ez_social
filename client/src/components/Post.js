import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    truncDesc: {
      // marginTop: '0',
    },
    desc: {
      // paddingTop: '0',
    }
  }));

const getFormattedDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(Date.parse(date)).toLocaleDateString('en-US', options);
}

const Post = ({ post, image }) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return ( 
          <Grid className={classes.root} item xs={12} sm={6}>
            <Card className={classes.card} variant="outlined">
                <CardHeader
                avatar={
                    <Avatar aria-label="username" className={classes.avatar}>
                    {post.author[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    <MoreVertIcon />
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
                      <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                      <ShareIcon />
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
                      <ExpandMoreIcon />
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
}
 
export default Post;