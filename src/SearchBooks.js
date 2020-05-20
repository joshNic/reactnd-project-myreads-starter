import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import NoImage from "./images/no-image.png";
import "./App.css";

class SearchBook extends React.Component {
  state = {
    searchResults: [],
    value: "",
    error: "",
  };
  handleChange = async (e) => {
    this.setState({ value: e.target.value });
    let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    for (let i = 0; i < specialChars.length; i++) {
      if (this.state.value.indexOf(specialChars[i]) !== -1) {
        this.setState({ searchResults: [] });
        this.setState({ error: "Invalid search query try again" });
        return;
      } else {
        this.setState({ error: "" });
      }
    }
    if (this.state.value === "") {
      this.setState({ searchResults: [] });
    } else {
      const searchResults = await BooksAPI.search(this.state.value);

      const newSearchBooks = searchResults.map((book) => {
        book.shelf = "none";
        this.props.books.forEach((bookOnShelf) => {
          if (book.id === bookOnShelf.id) {
            book.shelf = bookOnShelf.shelf;
          }
        });
        return book;
      });
      this.setState({
        searchResults: newSearchBooks,
      });
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.length > 0 &&
            this.state.value !== "" &&
            !this.state.error ? (
              this.state.searchResults.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: book.imageLinks
                            ? `url(${book.imageLinks["thumbnail"]})`
                            : `url(${NoImage})`,
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
            ) : (
              <div>
                {this.state.error.length > 0 && <p>{this.state.error}</p>}
                {this.state.error.length <= 0 && <p>No books available</p>}
              </div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBook;
