import { FC } from 'react';

import { MessageBox, Button } from '../../UI';
import { useAppSelector } from '../../../hooks';

import { ScheduleView } from '../ScheduleView';

export const SchedulePage: FC = () => {
  const { organisationsData } = useAppSelector((state) => state.organisations);

  const isNewsAllowed = organisationsData?.docs[0]?.allowedFeatures.includes('news');
  if (!isNewsAllowed) {
    return (
      <MessageBox>
        <span>Розклад не дозволений для вашої організації, чат-бот підтримки -</span>
        <Button href="https://t.me/univera_bot">@univera_bot</Button>
      </MessageBox>
    );
  }

  return <ScheduleView />;
};
