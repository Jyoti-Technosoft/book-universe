import React, { useEffect, useRef } from 'react';

import classes from './SearchBar.module.scss';

function SearchBar({ searchText, setSearchText }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      className={classes.input}
      value={searchText}
      ref={inputRef}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}

export default SearchBar;
