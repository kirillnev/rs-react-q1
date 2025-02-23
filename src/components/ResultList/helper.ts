import { NavigateFunction, Location } from 'react-router-dom';
import { ApiResponse } from '../../types';

export const onPageChange = (
  newPage: number,
  charactersData: ApiResponse,
  location: Location,
  navigate: NavigateFunction
) => {
  if (newPage < 1 || (charactersData && newPage > charactersData.info.pages)) {
    return;
  }

  const updatedSearchParams = new URLSearchParams(location.search);
  updatedSearchParams.set('page', newPage.toString());

  navigate({
    pathname: location.pathname,
    search: updatedSearchParams.toString(),
  });
};
