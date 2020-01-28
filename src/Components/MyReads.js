import React, { Component } from 'react';
import Shelves from './Shelves';
import * as BooksAPI from '../BooksAPI';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';

export default class MyReads extends Component {

    state = {
        booksLibrary: []
    };

    async componentDidMount() {
        let booksLibrary = await BooksAPI.getAll();

        this.setState({ booksLibrary: booksLibrary });
    }

    categorizeBooks = (booksLibrary) => {

        let allShelves = booksLibrary.map(b => b.shelf);
        let distinctShelves = [...new Set(allShelves)].sort();

        let result = {};

        for (const shelf of distinctShelves) {
            if (shelf === 'None')
                continue;
            let shelfBooks = booksLibrary.filter(b => b.shelf === shelf);
            result[shelf] = shelfBooks;
        }

        return result;
    }

    bookShelfChanged = (book, newShelf) => {

        BooksAPI.update(book, newShelf).then((result) => {

            book.shelf = newShelf;
            this.setState((currentState) => ({
                booksLibrary: [...currentState.booksLibrary.filter(b => b.id !== book.id), book]
            }));
        })
    }

    render() {

        let { booksLibrary } = this.state;

        let categorizedBooksByShelf = this.categorizeBooks(booksLibrary);

        const mainPageShelves = Object.keys(categorizedBooksByShelf).map((key, i) => (
            <Shelves shelfSelected={this.bookShelfChanged} key={i} shelfName={key} shelfBooks={categorizedBooksByShelf[key]} />
        ));

        return (
            <div className="myReadsContainer">

                <Route exact path="/" render={() => (
                    <React.Fragment>

                        <div className="list-books-title">
                            <h1>My Reads</h1>
                        </div>

                        {mainPageShelves}
                    </React.Fragment>
                )} />

                <Route exact path="/search" render={() => (<SearchPage allBooksHavingShelves={booksLibrary} shelfSelected={this.bookShelfChanged} />)} />
            </div>
        );
    }
}