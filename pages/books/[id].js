import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import Title from "../../components/text/Title";
import PointText from "../../components/text/PointText";
import { Button } from "../../components/button/Button";
import Text from "../../components/text/Text";
import classes from "./books.module.scss";
import altBookPng from "../../assets/altBook.png";

export const getSingleBook = async ({ queryKey }) => {
  let books = localStorage.getItem("books");
  if (books) {
    books = JSON.parse(books);
  }
  return books[queryKey[1] - 1];
};

function SingleBooks() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(
    ["id", id],
    getSingleBook
  );
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("savedBooks")) {
      const savedIds = JSON.parse(localStorage.getItem("savedBooks"));
      if (savedIds.indexOf(parseInt(id)) >= 0){
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem("books", JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return <BeatLoader color="#fff" size={20} />;
  }

  const handleSaveButtonClick = async () => {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks"));
    if (!isSaved) {
      savedBooks.push(data.id);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      toast.success("Book saved successfully");
      setIsSaved(true);
    } else {
      savedBooks.splice(savedBooks.indexOf(data.id), 1);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      setIsSaved(false);
      toast.error("Book Removed successfully");
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img}>
          <Image
            src={data.bookImg ? data.bookImg : altBookPng}
            height={300}
            width={300}
            alt={altBookPng}
          />
        </div>
        <div className={classes.info}>
          <Title variant="primary">{data.bookName}</Title>
          <PointText className={classes.infoText}>
            Author: {data.authorName}
          </PointText>
          <PointText className={classes.infoText}>
            Date Of Publish: {data.dateOfPublish}
          </PointText>
          <PointText className={classes.infoText}>
            Category: {data.bookCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Description: {data.description}
          </PointText>

          {isSaved && (
            <Text className={classes.greenText}>
              You already saved the book.
            </Text>
          )}
          <Button
            variant="primary"
            className={classes.saveButton}
            onClickHandler={handleSaveButtonClick}
          >
            {isSaved ? (
              <>
                <FaHeartBroken /> Remove
              </>
            ) : (
              <>
                <FaHeart className={classes.saveIcon} /> save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleBooks;
