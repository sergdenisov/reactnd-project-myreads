```jsx
const book = {
  imageLinks: {
    thumbnail: 'http://books.google.com/books/content?id=nzJQAQAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  title: 'Travel',
  authors: ['Michael Crichton'],
  shelf: 'wantToRead',
};

const onBookshelfChange = (book, prevShelf, newShelf) => {
  alert(`The bookshelf is changed from ${prevShelf} to ${newShelf}`);
  
  return new Promise(resolve => resolve());
};

<Book
  book={book}
  onBookshelfChange={onBookshelfChange}
  shouldUpdateAfterChanging
/>
```
