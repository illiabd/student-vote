/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Add24Regular, Search24Regular } from '@fluentui/react-icons';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findGroups, findStudents, loadGroups } from '../../../store/current/actions';
import { GroupCard } from './GroupCard';
import { Button, Input, Modal } from '../../UI';

import { CreateGroupModal } from './CreateGroupModal';
import { GroupsTabProps } from './types';
import styles from './GroupTab.module.scss';

export const GroupTab: FC<GroupsTabProps> = ({ selectedOrganisationId, hasOrganisations }) => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false);
  const [searchInputState, setSearchInputState] = useState<string>('');

  const { groupsData, studentsData, isLoading, isNextPageLoading } = useAppSelector(
    (state) => state.current,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedOrganisationId && hasOrganisations) {
      dispatch(findGroups({ organisation: selectedOrganisationId }));
    }
  }, [dispatch, hasOrganisations, selectedOrganisationId]);

  const hasGroups = groupsData?.docs?.length > 0;

  useEffect(() => {
    if (hasGroups) {
      dispatch(findStudents(selectedOrganisationId));
    }
  }, [dispatch, hasGroups, selectedOrganisationId]);

  const handleCreateGroupButtonClick = () => {
    setShowCreateGroupModal(true);
  };

  const handleModalClose = () => {
    setShowCreateGroupModal(false);
  };

  const handleInfiniteScrollLoader = () => {
    if (!isNextPageLoading) {
      dispatch(loadGroups({ organisation: selectedOrganisationId }));
    }
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchInputState(value);

    dispatch(
      findGroups({
        organisation: selectedOrganisationId,
        name: value,
      }),
    );
  };

  const groups = groupsData?.docs?.map((group) => {
    const currentGroupStudents = studentsData?.docs?.filter((student) =>
      group.users.includes(student.user.id),
    );

    return (
      <GroupCard
        key={group.id}
        groupData={group}
        studentsData={currentGroupStudents}
        organisationId={selectedOrganisationId}
      />
    );
  });

  return (
    <>
      <Modal onClose={handleModalClose} isShown={showCreateGroupModal} title="Створити групу">
        <CreateGroupModal organisationId={selectedOrganisationId} onClose={handleModalClose} />
      </Modal>
      <div className={styles.tools}>
        <Input
          value={searchInputState}
          endIcon={<Search24Regular />}
          onChange={handleSearchInputChange}
          placeholder="Введіть назву групи "
          noLabel
        />

        <Button endIcon={<Add24Regular />} size="md" onClick={handleCreateGroupButtonClick}>
          Створити групу
        </Button>
      </div>
      {isLoading && 'Loading...'}
      {hasGroups && !isLoading && (
        <InfiniteScroll
          dataLength={groupsData?.docs?.length ?? 0}
          next={handleInfiniteScrollLoader}
          hasMore={groupsData?.hasNextPage}
          loader={<>Loading...</>}
          scrollableTarget="scrollableDiv"
        >
          <div className={styles['groups-container']}>{groups}</div>
        </InfiniteScroll>
      )}
    </>
  );
};
