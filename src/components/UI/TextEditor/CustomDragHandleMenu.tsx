import { DragHandleMenu, RemoveBlockButton } from '@blocknote/react';
import { Block, BlockNoteEditor } from '@blocknote/core';
import { FC } from 'react';

import '@blocknote/core/style.css';

export const CustomDragHandleMenu: FC<{ editor: BlockNoteEditor; block: Block }> = (props) => (
  <DragHandleMenu>
    <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
  </DragHandleMenu>
);
