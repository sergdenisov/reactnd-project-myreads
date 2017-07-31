import React from 'react';
import Book from '../Book/Book'

const BooksGrid = (props) => (
  <ol className="books-grid">
    {props.books.map((book) => (
      <li key={book.id}>
        <Book book={book} onBookshelfChange={props.onBookshelfChange}/>
      </li>
    ))}
  </ol>
);

export default BooksGrid;
