import { ReactNode } from 'react';

type Tab = {
  title: string;
  content: ReactNode;
};

export type TabsProps = {
  data: Tab[];
};
