/* eslint-disable react/require-default-props */
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  Modifier,
  CompositeDecorator
} from 'draft-js';
import React, { useEffect, useRef, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Bold, Italic, Paperclip, Underline } from 'react-feather';
import Button from '../Button';
import TextInput from '../TextInput';

// @ts-ignore
function findLinkEntities(contentBlock, callback, contentState) {
  // @ts-ignore
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}

// @ts-ignore
const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#3b5998', textDecoration: 'underline' }}>
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

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
    EditorState.createEmpty(decorator)
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  const onURLChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrlValue(e.target.value);

  const promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setShowUrlInput(true);
      setUrlValue(url);
    }
  };

  const confirmLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    setEditorState(prev => {
      let nextEditorState = EditorState.set(prev, {
        currentContent: contentStateWithEntity
      });

      nextEditorState = RichUtils.toggleLink(
        nextEditorState,
        nextEditorState.getSelection(),
        entityKey
      );
      return nextEditorState;
    });
    setShowUrlInput(false);
    setUrlValue('');
  };

  const onLinkInputKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement>
  ) => {
    if ((e as React.KeyboardEvent<HTMLInputElement>).which === 13) {
      confirmLink(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

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
        <Paperclip size={14} onClick={promptForLink} />
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <TextInput
            onChange={onURLChange}
            placeholder="Enter url"
            type="text"
            value={urlValue}
            className="grow"
            onKeyDown={onLinkInputKeyDown}
          />

          <button onMouseDown={confirmLink}>Confirm</button>
        </div>
      )}
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
