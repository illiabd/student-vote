import '@blocknote/core/style.css';

import { BlockNoteEditor } from '@blocknote/core';
import {
  BlockTypeDropdown,
  CreateLinkButton,
  defaultBlockTypeDropdownItems,
  ToggledStyleButton,
  Toolbar,
} from '@blocknote/react';
import { FC } from 'react';

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
