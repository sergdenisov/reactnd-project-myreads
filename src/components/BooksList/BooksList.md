```jsx static
const shelves = ['wantToRead', 'read'];

const books = [
  {
    id: 1,
    title: 'Travel',
    authors: ['Michael Crichton'],
    shelf: 'wantToRead',
  },
  {
    id: 2,
    title: 'The Travel Book',
    authors: ['Lonely Planet Publications (Firm)'],
    shelf: 'read',
  },
];

const onBookshelfChange = (book, prevShelf, newShelf) => {
  alert(`The bookshelf is changed from ${prevShelf} to ${newShelf}`);
  
  return new Promise(resolve => resolve());
};

<BooksList
  status="ok"
  shelves={shelves}
  books={books}
  onBookshelfChange={onBookshelfChange}
/>
```
