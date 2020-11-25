import React from 'react';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import { createStructuredSelector } from 'reselect';
import { selectShopDataCollections } from './../../redux/selectors/shopDataSelector';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ItemsDisplay from './../../components/itemsDisplay/ItemsDisplay';

const ShopPage = ({ collections, match }) => {
  const renderPreview = (collectionItems) => {
    return collectionItems.map(({ id, ...otherCollectionItems }) => (
      <CollectionPreview key={id} {...otherCollectionItems} />
    ));
  };

  const renderCollectionsPreview = renderPreview(collections);

  const renderCollectionCategory = (match) => {
    const collectionItem = getTheItemsByCategory(collections, match.params.categoryId);
    return <ItemsDisplay {...collectionItem} categoryPage />;
  };

  return (
    <div>
      <h1>SHOP PAGE</h1>
      <Route exact path={`${match.path}`} render={() => renderCollectionsPreview} />
      <Route
        exact
        path={`${match.path}/:categoryId`}
        render={({ match }) => renderCollectionCategory(match)}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopDataCollections,
});

function getTheItemsByCategory(collectionsArray, category) {
  return collectionsArray.find((itemObj) => itemObj.routeName === category);
}

export default connect(mapStateToProps)(ShopPage);
