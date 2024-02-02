import React from 'react';

import classes from './HeroSection.module.scss';
import Text from '../text/Text';
import ButtonWithLink from '../button/Button';

function HeroSection() {
  return (
    <section className={classes.hero__section}>
      <div className={classes.hero__container}>
        <div className={classes.hero__info}>
          <h1 className={classes.hero__title}>
            Find the perfect
            {' '}
            <span>Content</span>
            {' '}
            for you
          </h1>
          <Text>a listing website of the books</Text>
          <div className={classes.hero__buttons}>
            <ButtonWithLink link="/savedBooks">Saved Books</ButtonWithLink>
            <ButtonWithLink link="/addBook" variant="primary">Add Books</ButtonWithLink>
          </div>
          <div className={classes.hero__buttons}>
            <ButtonWithLink link="/books" variant="primary">Explore Books</ButtonWithLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
