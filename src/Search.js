import React from 'react'
import { Books } from './Books'
import { search, getAll } from './BooksAPI'

export class Search extends React.Component {
    constructor() {
        super()
        Search.self = this;
    }

    state = {
        books: [],
        searchInput: '',
    }

    updateInputValue(evt) {
        Search.self.setState({
            searchInput: evt.target.value
        });
        if (Search.self.state.searchInput.length >= 1)
            setTimeout(Search.self.updateQuery)
    }

    componentDidMount() {
        getAll()
            .then(books => (
                Search.self.setState({ books })
            ))
    }

    updateQuery() {
        search(Search.self.state.searchInput)
            .then(books => (
                Search.self.setState({ books })
            )).catch(err => (
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
                    <Books books={Search.self.state.books} />
                </div>
            </div>
        )
    }
}




