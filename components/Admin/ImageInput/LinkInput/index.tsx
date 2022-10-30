import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import TextInput from '../../TextInput';

type ImageLinkInputProps = {
  value: string;
  onChange: (val: string) => void;
};

function ImageLinkInput({ value, onChange }: ImageLinkInputProps) {
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    setImgLink(value || '');
  }, [value]);

  return (
    <>
      <TextInput
        value={imgLink}
        onChange={({ target: { value } }) => setImgLink(value)}
        placeholder="Enter image url"
        className="my-2"
      />
      <Button onClick={() => onChange(imgLink)}>Save image link</Button>
    </>
  );
}

export default ImageLinkInput;
