```jsx
const shelf = 'read';

const booksOnShelf = [
  {
    id: 1,
    title: 'Travel',
    authors: ['Michael Crichton'],
    shelf: 'read',
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

<Bookshelf
  shelf={shelf}
  books={booksOnShelf}
  onBookshelfChange={onBookshelfChange}
/>
```
