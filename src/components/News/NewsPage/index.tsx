import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Button, MessageBox } from '../../UI';
import { findNews } from '../../../store/news/actions';

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

  const isNewsAllowed = organisationsData?.docs[0]?.allowedFeatures.includes('news');
  if (!isNewsAllowed) {
    return (
      <MessageBox>
        <span>Новини не дозволені для вашої організації, чат-бот підтримки -</span>
        <Button href="https://t.me/univera_bot">@univera_bot</Button>
      </MessageBox>
    );
  }

  return (
    <div className={styles.main}>
      <NewsFeed organisationId={selectedOrganisationId} />
    </div>
  );
};
