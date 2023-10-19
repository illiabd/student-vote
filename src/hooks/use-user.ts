import { useEffect } from 'react';

import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';
import { getUser } from '../store/auth/actions';

export const useUser = () => {
  const { userData, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return { user: userData, isUserLoading: isLoading };
};
