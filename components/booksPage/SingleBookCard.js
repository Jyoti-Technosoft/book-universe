import Image from "next/image";
import Link from "next/link";
import React from "react";

import Title from "../text/Title";
import classes from "./SingleBookCard.module.scss";

function SingleBookCard({ book }) {
  return (
    <Link href="/books/[id]" as={`/books/${book.id}`}>
      <a className={classes.item}>
        <Image
          src={book.image}
          height="200"
          width="300"
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
