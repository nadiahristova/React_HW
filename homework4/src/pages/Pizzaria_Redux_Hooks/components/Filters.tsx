import React from 'react';
import { IStore } from '../types';
import { FILTER_NAMES, changeFilter } from '../modules/visibilityFilter';
import { useDispatch, useSelector } from 'react-redux';

import ManagePizzaButton from './GenericButton'

function getActiveFilterName(store: IStore) {
  return store.visibilityFilter.name;
}

export default function Filters() {

  const activeFilterName = useSelector(getActiveFilterName);
  const dispatch = useDispatch();

  const onActivateFilter = (filterName: string) => {
        dispatch(changeFilter(filterName));
  }

  return (
    <nav className="filter-btns">
      {FILTER_NAMES.map(filterName => (
        <ManagePizzaButton
          className={filterName === activeFilterName ? 'selected' : ''}
          key={filterName}
          text={filterName}
          entityId={filterName}
          onChange={() => onActivateFilter(filterName)}/>
      ))}
    </nav>
  );
}
