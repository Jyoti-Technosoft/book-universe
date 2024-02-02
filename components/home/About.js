import React from 'react';
import Text from '../text/Text';
import Title from '../text/Title';
import classes from './About.module.scss';

function About() {
  return (
    <div className={classes.about}>
      <Title className={classes.title}>What is Book Universe</Title>
      <Text>
        It is an idea to share the content/books to any user.
        <br />
        User can find the books he needs. User can add the books/links.
        <br />
      </Text>
    </div>
  );
}

export default About;
