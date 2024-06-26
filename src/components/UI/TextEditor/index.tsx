import '@blocknote/core/style.css';

import {
  BlockNoteView,
  DefaultSideMenu,
  FormattingToolbarPositioner,
  getDefaultReactSlashMenuItems,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  useBlockNote,
} from '@blocknote/react';
import clsx from 'clsx';
import { FC } from 'react';

import { CustomDragHandleMenu } from './CustomDragHandleMenu';
import { CustomFormattingToolbar } from './CustomFormattingToolbar';
import styles from './TextEditor.module.scss';
import { TextEditorProps } from './types';

const customSlashMenuItemList = [...getDefaultReactSlashMenuItems()].slice(0, -1);

export const TextEditor: FC<TextEditorProps> = ({
  label,
  errors,
  editable = true,
  defaultContentHTML,
  touched,
  onChange,
}) => {
  const editor = useBlockNote({
    editable,
    slashMenuItems: customSlashMenuItemList,
    onEditorContentChange: async (currentEditor) => {
      if (!editable) {
        return;
      }

      if (!onChange) {
        return;
      }

      const blocks = currentEditor.topLevelBlocks;
      const html = await currentEditor.blocksToHTML(blocks);
      onChange(html, 500); // FIXME: find a way to count plain text length
    },
    onEditorReady: async (currentEditor) => {
      if (!defaultContentHTML) {
        return;
      }

      const defaultContentBlocks = await currentEditor.HTMLToBlocks(defaultContentHTML);
      currentEditor.replaceBlocks(currentEditor.topLevelBlocks, defaultContentBlocks);
    },
  });

  const hasErrors = errors && touched;

  const labelClasses = clsx(styles.label, hasErrors && styles.error);
  const hintsClasses = clsx(styles.hints, hasErrors && styles.error);

  const editorContainerClasses = clsx(
    styles['editor-wrapper'],
    editor.isFocused() && styles.focused,
    hasErrors && styles.error,
  );

  const isHintsShown = editor.isFocused() || hasErrors;

  return (
    <div className={styles.container}>
      <div className={labelClasses}>
        <h4>{label}</h4>
      </div>
      <div className={editable ? editorContainerClasses : ''}>
        <BlockNoteView editor={editor} theme="light">
          <FormattingToolbarPositioner
            editor={editor}
            formattingToolbar={CustomFormattingToolbar}
          />
          <HyperlinkToolbarPositioner editor={editor} />
          <SlashMenuPositioner editor={editor} />
          <SideMenuPositioner
            editor={editor}
            sideMenu={(props) => (
              <DefaultSideMenu {...props} dragHandleMenu={CustomDragHandleMenu} />
            )}
          />
        </BlockNoteView>
      </div>
      {isHintsShown && (
        <div className={hintsClasses}>
          <p>{errors}</p>
        </div>
      )}
    </div>
  );
};
