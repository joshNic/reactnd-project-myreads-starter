import React from "react";

const book = (props) => {
   return(<div>
    <div className="bookshelf">
      {props.items.map((item) => (
        <div key={item.value}>
          <h2 className="bookshelf-title">{item.display}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.length > 0
                ? props.books
                    .filter(
                      (bookShelf) => bookShelf.shelf === item.value
                    )
                    .map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks["thumbnail"]})`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
                                onChange={(e) =>
                                  props.updateBookShelf(
                                    book,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                {props.items.map((item) => (
                                  <option
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.display}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">
                            {book.title}
                          </div>
                          <div className="book-authors">
                            {book.authors.toString()}
                          </div>
                        </div>
                      </li>
                    ))
                : "loading"}
            </ol>
          </div>
        </div>
      ))}
    </div>
  </div>) 
};
export default book;
