import React from 'react';

import { Books } from './Books'

export class BookShelf extends React.Component {

    render() {
        const { books, updateCmp } = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <Books updateCmp={updateCmp} books={books.filter(book => book.shelf === "currentlyReading")} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <Books updateCmp={updateCmp} books={books.filter(book => book.shelf === "wantToRead")} />
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <Books updateCmp={updateCmp} books={books.filter(book => book.shelf === "read")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => location.pathname = '/search'}>Add a book</a>
                </div>
            </div>
        )
    }
}