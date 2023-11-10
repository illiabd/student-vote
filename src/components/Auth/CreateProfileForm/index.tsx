import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { ScreenOrientation } from '../../../constants';
import { useWindowWidth } from '../../../hooks';
import { CompanyForm } from './CompanyForm';
import styles from './CreateProfileForm.module.scss';
import { FinalWindow } from './FinalWindow';
import { Step } from './Step';
import { UserForm } from './UserForm';

const stepsData = [
  {
    title: 'Особисті дані',
    description: "Заповніть поля, що включають ваше ім 'я та контакти",
  },
  {
    title: 'Про компанію ',
    description: 'Заповніть поля, що включають інформацію про вашу компанію',
  },
  {
    title: 'Завершення реєстрації',
    description: '',
  },
];

export const CreateProfileForm: FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const windowWidth = useWindowWidth();

  const orientation = windowWidth > 855 ? ScreenOrientation.landscape : ScreenOrientation.portrait;

  const handleNextStep = () => {
    setSelectedStep((prev) => prev + 1);
  };

  const renderForm = (selected: number) => {
    switch (selected) {
      case 1:
        return <UserForm onNext={handleNextStep} orientation={orientation} />;
      case 2:
        return <CompanyForm onNext={handleNextStep} orientation={orientation} />;
      case 3:
        return <FinalWindow />;
      default:
        return 'Something went wrong :(';
    }
  };

  const steps = stepsData.map((stepData, index, array) => {
    const number = index + 1;
    const isLast = number === array?.length;

    const handleStepClick = () => {
      const isNotVisited = number > selectedStep;
      if (isNotVisited) {
        return;
      }

      setSelectedStep(number);
    };

    return (
      <Step
        onClick={handleStepClick}
        orientation={orientation}
        key={`step-${index}`}
        title={stepData.title}
        number={number}
        selectedNumber={selectedStep}
        isLast={isLast}
      />
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles['progress-container']}>
        <div className={styles['image-container']}>
          <Link to="/">
            <img alt="univera-logo" src="/images/univera-logo-full.svg" />
          </Link>
        </div>
        <div className={styles['progressbar-container']}>
          <div className={styles['progressbar-wrapper']}>
            <p className={styles.title}>{`Крок ${selectedStep}`}</p>
            <p className={styles.description}>{stepsData[selectedStep - 1].description}</p>
            <div className={styles.progressbar}>{steps}</div>
            {orientation === ScreenOrientation.portrait && (
              <p>{stepsData[selectedStep - 1].title}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles['form-wrapper']}>{renderForm(selectedStep)}</div>
    </div>
  );
};
