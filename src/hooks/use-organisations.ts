import { useEffect } from 'react';

import { findOrganisations } from '../store/organisations/actions';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const useOrganisations = (isAuthorized: boolean) => {
  const { organisationsData, isLoading } = useAppSelector((state) => state.organisations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        findOrganisations({
          filters: { role: 'admin' },
        }),
      );
    }
  }, [dispatch, isAuthorized]);

  return { organisationsData, isOrganisationsLoading: isLoading };
};
