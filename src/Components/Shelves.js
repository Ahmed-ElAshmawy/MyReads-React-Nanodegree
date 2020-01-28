import React, { Component } from 'react';
import BookCard from './BookCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import * as ShelfNameHelper from '../ShelfNameHelper';

export default class Shelves extends Component {

    useStyles = () => {
        return makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }));
    }

    bookShelfChanged = (book, newShelf) => {
        newShelf = ShelfNameHelper.reverseMapShelfName(newShelf);
        this.props.shelfSelected(book, newShelf);
    }

    render() {

        const { shelfBooks, shelfName } = this.props;

        const displayedShelfName = ShelfNameHelper.mapShelfName(shelfName);

        return (
            <React.Fragment>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">{displayedShelfName}</h2>
                </div>

                <Grid container spacing={2}>
                    {
                        shelfBooks.map((b, i) => (
                            <Grid key={b.id} item xs={4}>
                                <BookCard shelfSelected={this.bookShelfChanged} displayedShelfName={displayedShelfName} book={b} />
                            </Grid>
                        ))
                    }
                </Grid>


                <div className="open-search">
                    <Link
                        to='/search'
                    >
                        <AddCircleIcon className="circleIcon" fontSize="large" />
                    </Link>
                </div>
            </React.Fragment>
        );

    }
}