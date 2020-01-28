import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ActionMenu from './ActionMenu';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop: '5px;'
  },
  media: {
    height: 0,
    paddingTop: '129%', // 16:9
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

export default function BookCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { book } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const bookShelfChanged = (newShelf) => {
    props.shelfSelected(book, newShelf);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        action={
          <ActionMenu currentBookShelf={props.displayedShelfName} onItemClicked={bookShelfChanged} />
        }
        title={book.title}
        subheader={"Published on: " + book.publishedDate}
      />
      <CardMedia
        className={classes.media}
        image={book.imageLinks.thumbnail}
        title="Paella dish"
      />
      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p">
          Authors: {!book.authors || book.authors.length === 0 ? 'No Author' : book.authors.join(', ')}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Publisher: {!book.publisher ? "Unknown" : book.publisher}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Page Count: {book.pageCount} pages
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          Categories: {!book.categories || book.categories.length === 0 ? 'No Category' : book.categories.join(', ')}
        </Typography>

      </CardContent>

      <CardActions disableSpacing>

        <Box className="ratingBox" component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Average Rating</Typography>
          <Rating name="read-only" value={book.averageRating} readOnly />
        </Box>

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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {book.description}.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
