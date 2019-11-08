import { IPizza, IAction } from '../types';

const FILTERS = {
  All: () => true,
  OnDisplay: (t: IPizza) => !t.isVisible
};

export const FILTER_NAMES = Object.keys(FILTERS);

const ACTION_DISPLAY = 'filter:display';

export default function visibilityFilter(state: any, action: IAction<string>) {
  if (!state) {
    state = { name: 'All', filter: FILTERS.All};
  }

  switch (action.type) {
    case 'filter:display':
      const name = action.payload;
      const filter = (FILTERS as any)[name as any];

      if (!filter) {
        return state;
      }

      return {
        name: name,
        filter: filter,
      };

    default:
      return state;
  }
}

export function changeFilter(filterName: any): IAction<string> {
  return {
    type: ACTION_DISPLAY,
    payload: filterName,
  };
}
