import { ArrowSort24Regular, Options24Regular } from '@fluentui/react-icons';
import React, { FC } from 'react';

import { NewsFeedProps } from './types';
import { IconButton, MessageBox } from '../../UI';
import { NewsForm } from '../NewsForm';
import { NewsCard } from '../NewsCard';

import styles from './NewsFeed.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createArticle, findNews } from '../../../store/news/actions';
import { CreateArticleRequest } from '../../../store/news/types';
import { AllowedFeatures } from '../../../constants';

export const NewsFeed: FC<NewsFeedProps> = ({ organisationId }) => {
  const dispatch = useAppDispatch();
  const { organisationsData } = useAppSelector((state) => state.organisations);
  const { newsData, isLoading: isNewsLoading } = useAppSelector((state) => state.news);

  const handleFormSubmission = async (article: CreateArticleRequest) => {
    await dispatch(createArticle(article));
    dispatch(findNews({ organisation: organisationId }));
  };

  const selectedOrganisation = organisationsData?.docs.find((value) => value.id === organisationId);
  const isNewsAllowed = selectedOrganisation?.allowedFeatures.find(
    (feature) => feature === AllowedFeatures.news,
  );

  const hasNews = newsData?.docs?.length > 0;
  const newsComponents = hasNews
    ? newsData?.docs?.map((news) => <NewsCard key={news.id} data={news} />)
    : 'Новин немає';

  const newsNotAllowedContent = <MessageBox>Новини не дозволені поточній організації</MessageBox>;

  const content = isNewsAllowed ? (
    <>
      <NewsForm organisationId={organisationId} onSubmit={handleFormSubmission} />
      <div className={styles['feed-container']}>
        <div className={styles['tools-container']}>
          <p>Опубліковані</p>
          <div className={styles['button-container']}>
            <IconButton>
              <ArrowSort24Regular />
            </IconButton>
            <IconButton>
              <Options24Regular />
            </IconButton>
          </div>
        </div>
        <div className={styles['news-container']}>
          {!isNewsLoading ? newsComponents : 'Loading'}
        </div>
      </div>
    </>
  ) : (
    newsNotAllowedContent
  );

  return <div className={styles.container}>{content}</div>;
};
