import Image from "next/image";
import Link from "next/link";
import React from "react";

import Title from "../text/Title";
import classes from "./SingleBookCard.module.scss";

function SingleBookCard({ book }) {
  return (
    <Link href={`/books/${book.id}`}>
      <a className={classes.item}>
        <Image
          src={book.image}
          height="200"
          width="300"
          alt={book.name}
        />
        <Title className={classes.title} variant="secondary">
          {book.name}
        </Title>
      </a>
    </Link>
  );
}

export default SingleBookCard;
