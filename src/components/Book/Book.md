```jsx
const book = {
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
