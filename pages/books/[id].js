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

export const getSingleBook = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.books?.[0];
};

function SingleBooks() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(
    ["singleBook", id],
    getSingleBook
  );
  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("savedBooks")) {
      const savedBooks = JSON.parse(localStorage.getItem("savedBooks"));
      if (savedBooks.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem("savedBooks", JSON.stringify([]));
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
      savedBooks.push(data.idBook);
      localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
      toast.success("Book saved successfully");
      setIsSaved(true);
    } else {
      savedBooks.splice(savedBooks.indexOf(data.idBook), 1);
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
            src={data.strBookThumb}
            height={300}
            width={300}
            alt={data.strBook}
          />
        </div>
        <div className={classes.info}>
          <Title variant="primary">{data.strBook}</Title>
          <PointText className={classes.infoText}>
            Category: {data.strCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Area: {data.strArea}
          </PointText>
          <PointText className={classes.infoText}>
            tags: {data?.strTags?.split(",").join(", ")}
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
