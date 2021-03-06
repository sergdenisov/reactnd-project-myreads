const TITLES = new Map([
  ['currentlyReading', 'Currently Reading'],
  ['wantToRead', 'Want to Read'],
  ['read', 'Read'],
  ['none', 'None'],
]);

export const emptyShelf = 'none';

export const get = id => TITLES.get(id);

export const getAll = (exceptEmpty = false) =>
  exceptEmpty
    ? Array.from(TITLES).filter(([key]) => key !== emptyShelf)
    : Array.from(TITLES);
