import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findNews } from '../../../store/news/actions';
import { Button, MessageBox } from '../../UI';
import { NewsFeed } from '../NewsFeed';
import styles from './NewsPage.module.scss';

export const NewsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { organisationsData } = useAppSelector((state) => state.organisations);
  const selectedOrganisationId = useAppSelector((state) => state.current.selectedOrganisationId);

  useEffect(() => {
    const hasOrganisations = organisationsData && organisationsData?.docs?.length > 0;
    if (hasOrganisations && selectedOrganisationId) {
      dispatch(findNews({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, organisationsData, selectedOrganisationId]);

  const allowedFeatures = organisationsData?.docs[0].allowedFeatures;
  const isNewsAllowed = allowedFeatures?.includes('news');
  if (!isNewsAllowed) {
    return (
      <MessageBox>
        <span>Новини не дозволені для вашої організації, чат-бот підтримки -</span>
        <Button href="https://t.me/univera_bot">@univera_bot</Button>
      </MessageBox>
    );
  }

  if (!selectedOrganisationId) {
    return (
      <MessageBox>
        <span>Оберіть організацію</span>
      </MessageBox>
    );
  }

  return (
    <div className={styles.main}>
      <NewsFeed organisationId={selectedOrganisationId} />
    </div>
  );
};
