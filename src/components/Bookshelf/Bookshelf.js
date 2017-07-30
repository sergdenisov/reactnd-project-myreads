import React from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import Book from '../Book/Book'

const Bookshelf = (props) => props.books.length > 0 && (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{BookShelfTitles.get(props.shelf)}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) => (
          <li key={book.id}>
            <Book
              imageUrl={book.imageLinks.thumbnail}
              title={book.title}
              authors={book.authors && book.authors.join(', ')}
              shelf={book.shelf}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default Bookshelf;
