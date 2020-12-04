import React from 'react';
import CollectionItem from '../collection-item/CollectionItem';
import './collectionPreview.scss';

const CollectionPreview = ({ title, items, categoryPage }) => {
  const previewItems = items
    .filter((_, index) => (!categoryPage ? index < 6 : true))
    .map((item) => {
      return <CollectionItem key={item.id} item={item} />;
    });
  return (
    <React.Fragment>
      <div className='collection-preview'>
        <h3 className='title'>{title}</h3>
        <div className='preview'>{previewItems}</div>
      </div>
    </React.Fragment>
  );
};

export default CollectionPreview;
