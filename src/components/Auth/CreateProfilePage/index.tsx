import { FC } from 'react';

import { UserTypes } from '../../../constants';
import { useAppSelector } from '../../../hooks';
import { Button, MessageBox } from '../../UI';
import { CreateProfileForm } from '../CreateProfileForm';

export const CreateProfilePage: FC = () => {
  const { organisationsData } = useAppSelector((state) => state.organisations);
  const { userData } = useAppSelector((state) => state.auth);

  const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
  const isSuperadmin = userData?.type === UserTypes.superadmin;

  if (!userData) {
    return (
      <MessageBox>
        <p>Ви не авторизовані</p>
        <Button href="/auth">Увійти до акаунту</Button>
      </MessageBox>
    );
  }

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
