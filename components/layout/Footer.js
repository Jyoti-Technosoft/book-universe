import React from 'react';
import classes from './Footer.module.scss';
import Text from '../text/Text';

function Footer() {
  return (
    <footer className={classes.footer}>
      <Text>
        Find the perfect
        content
        for you
      </Text>
      <Text className={classes.copyright}>
        © “My-content” 2024 All right reserved.
      </Text>
    </footer>
  );
}

export default Footer;
