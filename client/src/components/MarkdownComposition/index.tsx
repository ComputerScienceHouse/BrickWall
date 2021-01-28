import React, { useState, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import './markdown-composition.scss';

interface MarkdownCompositionProps {
  inputSource: string;
  placeholder?: string;
}

const MarkdownComposition: React.FunctionComponent<MarkdownCompositionProps> = ({
  inputSource,
  placeholder
}) => {
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="markdown">
      <textarea
        className="markdown-input markdown-flex"
        placeholder={placeholder || 'Markdown formatted text'}
        onChange={handleChange}
      />
      <div className="markdown-display markdown-flex">
        <ReactMarkdown source={text} />
      </div>
    </div>
  );
};

export default MarkdownComposition;
