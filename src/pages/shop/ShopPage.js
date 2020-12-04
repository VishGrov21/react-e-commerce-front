import React, { Component } from 'react';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import { createStructuredSelector } from 'reselect';
import {
  selectShopCollectionsForPreview,
  selectIsShopDataFetching,
} from './../../redux/selectors/shopDataSelector';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ItemsDisplay from './../../components/itemsDisplay/ItemsDisplay';

import { fetchProductsDataAsync } from './../../redux/actions/productsActions';
import WithSpinner from '../../components/withSpinner/WithSpinner.component';

function renderPreview(collectionItems) {
  return collectionItems.map(({ id, ...otherCollectionItems }) => (
    <CollectionPreview key={id} {...otherCollectionItems} />
  ));
}

function RenderCollectionsPreview({ collections }) {
  // console.log('Props Are: ', props);
  return renderPreview(collections);

  // <h1>Hello</h1>;
}

function RenderCollectionCategory({ match, collections }) {
  console.log('Collections is ', collections);
  const collectionItem = getTheItemsByCategory(collections, match.params.categoryId);
  return <ItemsDisplay {...collectionItem} categoryPage />;
}

const RenderPreviewWithSpinner = WithSpinner(RenderCollectionsPreview);

const RenderCollectionCategoryWithLoader = WithSpinner(RenderCollectionCategory);

class ShopPage extends Component {
  componentDidMount() {
    this.props.fetchProductsDataAsync();
  }
  render() {
    const { collections, isShopDataFetching } = this.props;
    const { match } = this.props;
    return (
      <div>
        <h1>SHOP PAGE</h1>
        <Route
          exact
          path={`${match.path}`}
          render={() => <RenderPreviewWithSpinner isLoading={isShopDataFetching} {...this.props} />}
        />
        <Route
          exact
          path={`${match.path}/:categoryId`}
          render={(routerProps) => (
            <RenderCollectionCategoryWithLoader
              isLoading={isShopDataFetching}
              {...routerProps}
              collections={collections}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isShopDataFetching: selectIsShopDataFetching,
  collections: selectShopCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsDataAsync: () => dispatch(fetchProductsDataAsync()),
});

function getTheItemsByCategory(collectionsArray, category) {
  return collectionsArray.find((itemObj) => itemObj.routeName === category);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
