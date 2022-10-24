/* eslint-disable react/require-default-props */
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  Modifier
} from 'draft-js';
import React, { useEffect, useRef } from 'react';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Bold, Italic, Underline } from 'react-feather';
import Button from '../Button';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: <Bold size={14} /> },
  { label: 'Italic', style: 'ITALIC', icon: <Italic size={14} /> },
  { label: 'Underline', style: 'UNDERLINE', icon: <Underline size={14} /> }
];

const tabCharacter = '    ';

type BBBRichTextEditorTypes = {
  value: string;
  onChange: (val: string) => void;
};
const RichTextEditor = React.forwardRef<
  Draft.DraftComponent.Base.DraftEditor,
  BBBRichTextEditorTypes
>(({ value, onChange }, ref) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleTab = (e: React.KeyboardEvent) => {
    e.preventDefault();

    let currentState = editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    setEditorState(
      EditorState.push(currentState, newContentState, 'insert-characters')
    );
  };

  const inputRef = useRef<Draft.DraftComponent.Base.DraftEditor>(null);

  const inlineStyle = editorState.getCurrentInlineStyle();

  useEffect(() => {
    const blocksFromHTML = htmlToDraft(value || '');
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      )
    );
  }, [value]);

  const onInlineClick = (style: string) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(nextState);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-center">
        {INLINE_STYLES.map(d => (
          <div
            className={`p-1 cursor-pointer select-none rounded ${
              inlineStyle.has(d.style) ? 'bg-gray-200' : ''
            }`}
            key={d.label}
            onClick={() => onInlineClick(d.style)}
          >
            {d.icon || d.label}
          </div>
        ))}
      </div>
      <div
        className={`border bg-white rounded px-2 py-1 ${
          document.activeElement === (ref as any)?.current?.editor
            ? 'border-[#FD823E]'
            : ''
        }`}
        onClick={() => (ref as any)?.current?.focus()}
      >
        <Editor
          ref={inputRef}
          editorState={editorState}
          onChange={setEditorState}
          onTab={handleTab}
        />
      </div>
      <Button
        onClick={() =>
          onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }
      >
        Save
      </Button>
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
