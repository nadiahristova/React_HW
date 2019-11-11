import { IAction } from '../pages/StoreFront/types';
import { IVisible } from './votes';

const FILTERS = {
  All: () => true,
  OnDisplay: (t: IVisible) => t.isVisible,
  Hidden: (t: IVisible) => !t.isVisible
};

export const FILTER_NAMES = Object.keys(FILTERS);

//#region [ Constants ]
const ACTION_DISPLAY = 'filter:display';
//endregion

//#region [ Reducers ]
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
//#endregion

//#region [ Actions ]
export function changeFilter(filterName: any): IAction<string> {
  return {
    type: ACTION_DISPLAY,
    payload: filterName,
  };
}
//#endregion
