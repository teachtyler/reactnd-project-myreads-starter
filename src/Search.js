import React from 'react'
import { Books } from './Books'
import { search, getAll } from './BooksAPI'

export class Search extends React.Component {
    constructor() {
        super()
        /*
            babel replaces `this` to a higher closure
            so this hack in the meantime to make it work
        */
        Search.self = this;
    }

    state = {
        books: [],
        searchInput: '',
    }

    searchLength() {
        return Search.self.state.searchInput.length >= 1
    }

    updateInputValue(evt) {
        Search.self.setState({
            searchInput: evt.target.value
        });
        if (Search.self.searchLength())
            setTimeout(Search.self.updateQuery)
    }


    componentDidMount() {
        (Search.self.searchLength())
            ? Search.self.updateQuery()
            : getAll()
                .then(books => (
                    Search.self.setState({ books })
                ))
    }

    updateQuery() {
        search(Search.self.state.searchInput)
            .then(res => {
                return getAll().then(allBooks => {
                    console.log('res', res)
                    res.map(book => {
                        let knownBook = allBooks.find(x => x.id === book.id)
                        if (knownBook)
                            book.shelf = knownBook.shelf
                        else
                            book.shelf = 'none'
                    })
                    return res
                }).catch(err => console.log)
            }).then(books => {
                console.log('books: ', books)
                Search.self.setState({ books })
            }).catch(err => (
                console.log(err)
            ))
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => location.pathname = '/'}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/* 
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                            
                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input value={Search.self.state.searchInput} onChange={Search.self.updateInputValue} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <Books updateCmp={Search.self.componentDidMount} books={Search.self.state.books} />
                </div>
            </div>
        )
    }
}




