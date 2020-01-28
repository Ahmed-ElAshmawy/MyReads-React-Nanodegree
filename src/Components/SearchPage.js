import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Grid from '@material-ui/core/Grid';
import BookCard from './BookCard';
import * as ShelfNameHelper from '../ShelfNameHelper';

export default class SearchPage extends Component {

    state = {
        query: "",
        searchedBooks: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });

        BooksAPI.search(query).then((result) => {
            let books = []
            if (result && result.length > 0) {
                this.mapShelvedBooks(result);
                books = result;
            }

            this.setState({ searchedBooks: books })
        })
    }

    mapShelvedBooks = (searchedBooks) => {
        for (const book of this.props.allBooksHavingShelves) {
            let bookIndex = searchedBooks.findIndex(b => b.title === book.title);
            if (bookIndex === -1)
                continue;
            searchedBooks[bookIndex].shelf = book.shelf;
        }
    }

    bookShelfChanged = (book, newShelf) => {
        newShelf = ShelfNameHelper.reverseMapShelfName(newShelf);
        this.props.shelfSelected(book, newShelf);
    }

    render() {

        const { query, searchedBooks } = this.state;

        return (
            <React.Fragment>
                <div className="search-books" >
                    <div className="search-books-bar">
                        <Link
                            className="close-search"
                            to='/'>
                            Close
                   </Link>

                        <div className="search-books-input-wrapper">
                            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input type="text" placeholder="Search by title or author" value={query}
                                onChange={(event) => this.updateQuery(event.target.value)} />

                        </div>
                    </div>
                </div>

                <Grid className="search-grid-result" container spacing={2}>
                    {
                        searchedBooks.map((b, i) => (
                            <Grid key={b.id} item xs={4}>
                                <BookCard shelfSelected={this.bookShelfChanged} displayedShelfName={ShelfNameHelper.mapShelfName(b.shelf)} book={b} />
                            </Grid>
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }

}