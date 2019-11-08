import React from 'react';
import { IStore } from '../types';
import { FILTER_NAMES, changeFilter } from '../modules/visibilityFilter';
import { useDispatch, useSelector } from 'react-redux';

import ManagePizzaButton from './ManagePizzaButton'

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
    <span>
      {FILTER_NAMES.map(filterName => (
        <ManagePizzaButton
          className={filterName === activeFilterName ? 'selected' : ''}
          key={filterName}
          text={filterName}
          entity={filterName}
          onChange={() => onActivateFilter(filterName)}/>
      ))}
    </span>
  );
}
