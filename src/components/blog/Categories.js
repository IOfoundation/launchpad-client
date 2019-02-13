import React from 'react';
import Category from './Category';

const Categories = () => {
  return (
    <div className="blog-categories">
      <h3 className="blog-categories__title text-bold">{'Categories'}</h3>
      <ul className="blog-categories__list">
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Front Page"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Another Category"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
        <Category
          to="#"
          className="blog-categories__list__item"
          label="Category Title"
        />
      </ul>
      <button className="button-outline text-bold">{'More Categories'}</button>
    </div>
  );
};

export default Categories;
