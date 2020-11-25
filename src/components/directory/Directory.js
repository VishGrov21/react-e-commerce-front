import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import './directory.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySection } from './../../redux/selectors/directorySelector';
import { connect } from 'react-redux';

const Directory = ({ sections }) => {
  let menuItems = sections.map(({ id, ...sectionProps }) => {
    return <MenuItem key={id} {...sectionProps} />;
  });
  return <div className='directory-menu'>{menuItems}</div>;
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection,
});

export default connect(mapStateToProps)(Directory);
