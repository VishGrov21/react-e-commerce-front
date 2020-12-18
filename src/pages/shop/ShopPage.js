import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import {
  selectShopCollectionsForPreview,
  selectIsShopDataFetching,
} from './../../redux/selectors/shopDataSelector';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ItemsDisplay from './../../components/itemsDisplay/ItemsDisplay';
import { fetchProductsDataStart } from './../../redux/actions/productsActions';
import WithSpinner from '../../components/withSpinner/WithSpinner.component';

function renderPreview(collectionItems) {
  return collectionItems.map(({ id, ...otherCollectionItems }) => (
    <CollectionPreview key={id} {...otherCollectionItems} />
  ));
}

function RenderCollectionsPreview({ collections }) {
  return renderPreview(collections);
}

function RenderCollectionCategory({ match, collections }) {
  console.log('Collections is ', collections);
  const collectionItem = getTheItemsByCategory(collections, match.params.categoryId);
  return <ItemsDisplay {...collectionItem} categoryPage />;
}

function getTheItemsByCategory(collectionsArray, category) {
  return collectionsArray.find((itemObj) => itemObj.routeName === category);
}

const RenderPreviewWithSpinner = WithSpinner(RenderCollectionsPreview);

const RenderCollectionCategoryWithLoader = WithSpinner(RenderCollectionCategory);

const ShopPage = ({ fetchProductsDataStart, collections, isShopDataFetching, match }) => {
  useEffect(() => {
    fetchProductsDataStart();
  }, [fetchProductsDataStart]);

  return (
    <div>
      <h1>SHOP PAGE</h1>
      <Route
        exact
        path={`${match.path}`}
        render={() => (
          <RenderPreviewWithSpinner isLoading={isShopDataFetching} collections={collections} />
        )}
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
};

const mapStateToProps = createStructuredSelector({
  isShopDataFetching: selectIsShopDataFetching,
  collections: selectShopCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsDataStart: () => dispatch(fetchProductsDataStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
