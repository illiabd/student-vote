import { FC } from 'react';

import { UserTypes } from '../../../constants';
import { useOrganisations, useUser } from '../../../hooks';
import { Button, MessageBox } from '../../UI';
import { CreateProfileForm } from '../CreateProfileForm';

export const CreateProfilePage: FC = () => {
  const { user, isUserLoading } = useUser();
  const { organisationsData, isOrganisationsLoading } = useOrganisations(!!user);

  const isLoading = isUserLoading || isOrganisationsLoading;

  if (isLoading) {
    return (
      <MessageBox>
        <p>Loading</p>
      </MessageBox>
    );
  }

  if (!user && !isLoading) {
    return (
      <MessageBox>
        <p>Ви не авторизовані</p>
        <Button href="/">Авторизуватися</Button>
      </MessageBox>
    );
  }

  const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
  const isSuperadmin = user?.type === UserTypes.superadmin;

  if (!isSuperadmin && hasOrganisations) {
    return (
      <MessageBox>
        <span style={{ marginBottom: '12px' }}>Ви вже зареєстрували компанію</span>
        <Button href="/">На головну</Button>
      </MessageBox>
    );
  }

  return <CreateProfileForm />;
};
