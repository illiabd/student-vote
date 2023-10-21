import '@blocknote/core/style.css';

import { Block, BlockNoteEditor } from '@blocknote/core';
import { DragHandleMenu, RemoveBlockButton } from '@blocknote/react';
import { FC } from 'react';

export const CustomDragHandleMenu: FC<{ editor: BlockNoteEditor; block: Block }> = (props) => (
  <DragHandleMenu>
    <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
  </DragHandleMenu>
);
