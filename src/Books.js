import React from 'react'
import { update } from './BooksAPI'

export class Books extends React.Component {
    constructor(props) {
        super(props)
        Books.self = this;
        const { updateCmp } = this.props
        Books.self.updateCmp = updateCmp
    }

    updateBooks(shelf, id) {
        console.log(shelf, id)
        update(id, shelf)
            .then(res => (
                Books.self.updateCmp()
            )).catch(err => (
                console.error(err)
            ))
    }

    changeShelfs(evt) {
        Books.self.updateBooks(evt.target.value, evt.target.id)
    }

    render() {
        const { books } = this.props
        return (
            <ol className="books-grid">
                {books.map(book => (
                    <li key={book.id} >
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                    <select id={book.id} value={book.shelf} onChange={this.changeShelfs}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.author}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}