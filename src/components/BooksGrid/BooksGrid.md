```jsx
const books = [
  {
    id: 1,
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=nzJQAQAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    title: 'Travel',
    authors: ['Michael Crichton'],
    shelf: 'wantToRead',
  },
  {
    id: 2,
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=QfdOYgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    title: 'The Travel Book',
    authors: ['Lonely Planet Publications (Firm)'],
    shelf: 'read',
  },
];

const onBookshelfChange = (book, prevShelf, newShelf) => {
  alert(`The bookshelf is changed from ${prevShelf} to ${newShelf}`);
  
  return new Promise(resolve => resolve());
};

<BooksGrid
  books={books}
  onBookshelfChange={onBookshelfChange}
  shouldUpdateBookAfterChanging
/>
```
