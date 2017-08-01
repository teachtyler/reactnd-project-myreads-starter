import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Search } from './Search'
import { Books } from './Books'
import { BookShelf } from './BookShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: (location.pathname === '/search')
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  handleUpdate() {
    this.componentDidMount()
  }

  render() {
    let update = this.handleUpdate
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search show={this.state.showSearchPage} />
        ) : (
            <BookShelf updateCmp={this.handleUpdate.bind(this)} books={this.state.books} />
          )}
      </div>
    )
  }
}

export default BooksApp
