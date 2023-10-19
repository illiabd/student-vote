/* eslint-disable operator-linebreak */

import { FC } from 'react';
import { BlockNoteEditor } from '@blocknote/core';
import {
  ToggledStyleButton,
  Toolbar,
  BlockTypeDropdown,
  CreateLinkButton,
  defaultBlockTypeDropdownItems,
} from '@blocknote/react';
import '@blocknote/core/style.css';

type CustomFormattingToolbarProps = {
  editor: BlockNoteEditor;
};

export const CustomFormattingToolbar: FC<CustomFormattingToolbarProps> = (props) => {
  const { editor } = props;

  return (
    <Toolbar>
      <BlockTypeDropdown editor={editor} items={defaultBlockTypeDropdownItems} />
      <ToggledStyleButton editor={editor} toggledStyle="bold" />
      <ToggledStyleButton editor={editor} toggledStyle="italic" />
      <ToggledStyleButton editor={editor} toggledStyle="underline" />
      <ToggledStyleButton editor={editor} toggledStyle="strike" />
      <CreateLinkButton editor={editor} />
    </Toolbar>
  );
};
