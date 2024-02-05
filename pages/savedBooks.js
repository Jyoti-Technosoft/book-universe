import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import PointText from "../components/text/PointText";
import Text from "../components/text/Text";
import Title from "../components/text/Title";
import { getSingleBook } from "./books/[id]";
import classes from "./savedBooks.module.scss";

function SavedBooks() {
  const [savedBooksId, setSavedBooksId] = useState([]);

  const queries = savedBooksId.map((id) => ({
    queryKey: ["singleBook", id],
    queryFn: getSingleBook,
  }));

  const result = useQueries({ queries });

  useEffect(() => {
    if (localStorage.getItem("savedBooks")) {
      setSavedBooksId(JSON.parse(localStorage.getItem("savedBooks")));
    }
  }, []);

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        My Saved Books List
      </Title>
      <div className={classes.list_container}>
        {savedBooksId.length <= 0 && <Text>You have no saved books</Text>}
        {result &&
          result.map(({ data, isLoading }, index) => {
            if (isLoading) {
              return (
                <BeatLoader
                  key={savedBooksId[[index]]}
                  color="#fff"
                  loading={isLoading}
                  size={20}
                />
              );
            }

            return (
              <Link href={`/books/${data.id}`} key={data.id}>
                <a className={classes.singleBook}>
                  <Title variant="secondary" className={classes.bookTitle}>
                    {data.bookName}
                  </Title>
                  <PointText className={classes.infoText}>
                    Author: {data.authorName}
                  </PointText>
                  <PointText className={classes.infoText}>
                    Category: {data.bookCategory}
                  </PointText>
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default SavedBooks;
