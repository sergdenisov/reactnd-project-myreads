import React from 'react';
import * as BookShelfTitles from '../../utils/BookShelfTitles';
import BooksGrid from '../BooksGrid/BooksGrid';
import './Bookshelf.css';

const Bookshelf = (props) => props.books.length > 0 && (
  <div className="bookshelf">
    <h2 className="bookshelf__title">{BookShelfTitles.get(props.shelf)}</h2>
    <div className="bookshelf__books">
      <BooksGrid books={props.books} onBookshelfChange={props.onBookshelfChange}/>
    </div>
  </div>
);

export default Bookshelf;
