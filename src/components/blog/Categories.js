import React from 'react';
import Category from './Category';

const Categories = () => {
  return (
    <div className="blog-categories">
      <h3>{'Categories'}</h3>
      <ul className="blog-categories">
        <Category to="#" label="Front Page" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Another Category" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Category Title" />
        <Category to="#" label="Category Title" />
      </ul>
      <button className="outline-button">{'More Categories'}</button>
    </div>
  );
};

export default Categories;
