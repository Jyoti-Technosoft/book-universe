import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Title from '../text/Title';
import classes from './SingleBookCard.module.scss';
import bookIcon from '../../assets/altBook.png';

function SingleBookCard({ book }) {
  return (
    <Link href="/books/[id]" as={`/books/${book.bookId}`}>
      <a className={classes.item}>
        <Image
          className={classes.singleImage}
          src={book.bookImg ? book.bookImg : bookIcon}
          height="300"
          width="200"
          alt={book.bookName}
        />
        <Title className={classes.title} variant="secondary">
          {book.bookName}
        </Title>
      </a>
    </Link>
  );
}

export default SingleBookCard;
