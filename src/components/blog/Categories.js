import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import * as actions from '../../actions/blogs';

import Category from './Category';
import CategoriesLoading from './Loading/Categories';

class Categories extends PureComponent {
  state = {
    viewMore: true,
    onViewMoreActive: 10,
  };

  componentDidMount() {
    this.props.actions.getCategories();
  }

  viewMoreHandler = () => {
    this.setState(prevState => {
      return {
        viewMore: !prevState.viewMore,
      };
    });
  };

  filterByCategory = name => {
    this.props.actions.getAllPosts(1, name);
  };

  render() {
    const {categories, categorySelected, categoryLoading} = this.props;
    const {viewMore, onViewMoreActive} = this.state;
    let categoriesElements = <CategoriesLoading />;
    let viewMoreElement = null;

    if (categories.length > 1) {
      if (viewMore) {
        categoriesElements = categories
          .slice(0, onViewMoreActive)
          .map(category => {
            return (
              <Category
                className="blog-categories__list__item"
                clicked={() => this.filterByCategory(category.name)}
                isSelected={category.name === categorySelected}
                key={category.id}
                label={category.name}
              />
            );
          });
      } else {
        categoriesElements = categories.map(category => {
          return (
            <Category
              className="blog-categories__list__item"
              clicked={() => this.filterByCategory(category.name)}
              isSelected={category.name === categorySelected}
              key={category.id}
              label={category.name}
            />
          );
        });
      }
    } else if (!categoryLoading) {
      categoriesElements = <p>{'No categories'}</p>;
    }

    if (categories.length > onViewMoreActive) {
      viewMoreElement = (
        <button
          className="button-outline view-more text-bold"
          onClick={this.viewMoreHandler}
        >
          {viewMore ? 'More Categories' : 'View Less'}
        </button>
      );
    }

    return (
      <div className="blog-categories">
        <h3 className="blog-categories__title text-bold">
          <i className="material-icons blog-categories__title__icon">
            {'label'}
          </i>
          <span>{'Categories'}</span>
        </h3>
        <ul className="blog-categories__list">{categoriesElements}</ul>
        {viewMoreElement}
      </div>
    );
  }
}

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    categories: _blogs.categories,
    categorySelected: _blogs.category,
    categoryLoading: _blogs.categoriesLoading,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

Categories.propTypes = {
  actions: PropTypes.shape({
    getCategories: PropTypes.func,
    getAllPosts: PropTypes.func,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  categoryLoading: PropTypes.bool,
  categorySelected: PropTypes.string,
  postsCategories: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
