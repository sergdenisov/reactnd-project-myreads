const TITLES = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
  none: 'None'
};

export const get = (id) => TITLES[id];

export const getAll = () => TITLES;
