import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import "./App.css";

class SearchBook extends React.Component {
  state = {
    searchResults: [],
    value: "",
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.value === "") {
      this.setState({ searchResults: [] });
    } else {
      const searchResults = await BooksAPI.search(this.state.value);
      this.setState({ searchResults: searchResults });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Search by title or author"
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.length > 0
              ? this.state.searchResults.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks["thumbnail"]
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf}
                            onChange={(e) =>
                              this.props.updateBookShelf(book, e.target.value)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            {this.props.items.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.display}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors ? book.authors.toString() : "No authors"}
                      </div>
                    </div>
                  </li>
                ))
              : "No books available"}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBook;
