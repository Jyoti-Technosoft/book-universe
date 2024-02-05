import React from "react";

import classes from "./Footer.module.scss";
import Text from "../text/Text";

function Footer() {
  return (
    <div className={classes.container}>
      <footer className={classes.footer}>
        <Text>Find the perfect content for you</Text>
        <Text className={classes.copyright}>
          © “My-content” 2024 All right reserved.
        </Text>
      </footer>
    </div>
  );
}

export default Footer;
