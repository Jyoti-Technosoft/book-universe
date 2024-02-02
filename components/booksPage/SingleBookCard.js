import Image from "next/image";
import Link from "next/link";
import React from "react";

import Title from "../text/Title";
import classes from "./SingleBookCard.module.scss";

function SingleBookCard({ book }) {
  return (
    <Link href={`/books/${book.idBook}`}>
      <a className={classes.item}>
        <Image
          src={book.strBookThumb}
          height="200"
          width="300"
          alt={book.strBook}
        />
        <Title className={classes.title} variant="secondary">
          {book.strBook}
        </Title>
      </a>
    </Link>
  );
}

export default SingleBookCard;
