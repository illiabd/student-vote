import { Add24Regular, Delete24Regular } from '@fluentui/react-icons';
import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findStudents, loadStudents } from '../../../store/current/actions';
import { Card, IconButton, Modal } from '../../UI';
import { AddStudentModal } from './AddStudentModal';
import { DeleteStudentModal } from './DeleteStudentModal';
import styles from './StudentsTab.module.scss';
import { StudentTabProps } from './types';

export const StudentsTab: FC<StudentTabProps> = ({ selectedOrganisationId, hasOrganisations }) => {
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const { studentsData, isNextPageLoading } = useAppSelector((state) => state.current);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedOrganisationId && hasOrganisations) {
      dispatch(findStudents(selectedOrganisationId));
    }
  }, [dispatch, hasOrganisations, selectedOrganisationId]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleModalClose = () => {
    setShowAddStudentModal(false);
    setShowDeleteStudentModal(false);
  };

  const handleAddStudentButtonClick = () => {
    setShowAddStudentModal(true);
  };

  const handleDeleteButtonClick = () => {
    if (selected?.length <= 0) {
      return;
    }

    setShowDeleteStudentModal(true);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = studentsData?.docs?.map((student) => student.user.id);
      setSelected(newSelected ?? []);
      return;
    }
    setSelected([]);
  };

  const handleInfiniteScrollLoader = () => {
    if (!isNextPageLoading) {
      dispatch(loadStudents(selectedOrganisationId));
    }
  };

  const isModalShown = showAddStudentModal || showDeleteStudentModal;
  const hasStudents = studentsData && studentsData?.docs?.length > 0;
  const isMainCheckboxChecked = selected?.length > 0;
  const students =
    hasStudents &&
    studentsData?.docs?.map(({ user }) => {
      const hasFullNAme = user.lastName || user.firstName || user.patronymic;
      const fullName = hasFullNAme
        ? `${user?.lastName || ''} ${user?.firstName || ''} ${user?.patronymic || ''}`
        : '—';

      const isStudentSelected = isSelected(user.id);

      const handleClick = () => {
        const selectedIndex = selected.indexOf(user.id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, user.id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }

        setSelected(newSelected);
      };

      return (
        <tr key={user.id} className={styles.row}>
          <td className={styles.cell}>
            <input type="checkbox" checked={isStudentSelected} onChange={handleClick} />
          </td>
          <td className={styles.cell}>{fullName}</td>
          <td className={styles.cell}>{user.phoneNumber}</td>
        </tr>
      );
    });

  return (
    <Card className={styles['students-card']}>
      <Modal onClose={handleModalClose} isShown={isModalShown} title="Додати студента">
        {showAddStudentModal ? (
          <AddStudentModal organisationId={selectedOrganisationId} onClose={handleModalClose} />
        ) : (
          <DeleteStudentModal
            organisationId={selectedOrganisationId}
            users={selected}
            onClose={handleModalClose}
          />
        )}
      </Modal>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div className={styles['tools-container']}>
          <IconButton onClick={handleAddStudentButtonClick}>
            <Add24Regular primaryFill="#323333" />
          </IconButton>
          <IconButton onClick={handleDeleteButtonClick}>
            <Delete24Regular primaryFill="#323333" />
          </IconButton>
        </div>
      </div>
      <InfiniteScroll
        dataLength={studentsData?.docs.length ?? 0}
        next={handleInfiniteScrollLoader}
        hasMore={studentsData?.hasNextPage ?? false}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <input
                  type="checkbox"
                  checked={isMainCheckboxChecked}
                  onChange={handleSelectAllClick}
                />
              </td>
              <td className={styles.cell}>ПІБ</td>
              <td className={styles.cell}>Телефон</td>
            </tr>
          </thead>

          <tbody>{students}</tbody>
        </table>
      </InfiniteScroll>
      {!hasStudents && <p>Організація не має учасників</p>}
    </Card>
  );
};
