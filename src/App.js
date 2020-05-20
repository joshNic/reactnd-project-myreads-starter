import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import { Route, Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";
class BooksApp extends React.Component {
  state = {
    books: [],
    items: [
      { value: "currentlyReading", display: "Currently Reading" },
      { value: "wantToRead", display: "Want To Read" },
      { value: "read", display: "Read" },
      { value: "none", display: "None" },
    ],
  };

  updateBookShelf = async (book, event) => {
    if(event==='none'){
      this.setState(prevState => ({
        books:prevState.books.filter(b => b.id !== book.id)}));
    }else {
      book.shelf = event;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
    await BooksAPI.update(book, event);
  };

  async componentDidMount() {
    const booksArray = await BooksAPI.getAll();
    this.setState({ books: booksArray });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              items={this.state.items}
              updateBookShelf={this.updateBookShelf}
              books={this.state.books}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Book
                  items={this.state.items}
                  books={this.state.books}
                  updateBookShelf={this.updateBookShelf}
                />
              </div>
              <Link to="/search">
                <div className="open-search">
                  <button>Add a book</button>
                </div>
              </Link>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
