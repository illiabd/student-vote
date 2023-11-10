import { useEffect } from 'react';

import { getUser } from '../store/auth/actions';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const useUser = () => {
  const { userData, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return { user: userData, isUserLoading: isLoading };
};
