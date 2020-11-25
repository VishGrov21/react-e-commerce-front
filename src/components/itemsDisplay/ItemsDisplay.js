import React from 'react';
import CollectionItem from '../collection-item/CollectionItem';
import './itemsDisplay.scss';

const ItemsDisplay = ({ title, items, categoryPage }) => {
  console.log(`title: ${title}`);
  const previewItems = items.map((item) => {
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

export default ItemsDisplay;
