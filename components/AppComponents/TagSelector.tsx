import Input from '@components/common/Input';
import { useTextInput } from '@hooks/formHooks';
import React, { useEffect, useState } from 'react';

interface Props {
  setSelectedTags: (value: string[]) => void;
  selectedTags: string[];
}

export default function TagSelector({ setSelectedTags, selectedTags }: Props) {
  const tags: string[] = ['Meat', 'Lunch', 'Dinner'];

  const [tag, changeTag] = useTextInput('');

  const [availableTags, setAvailableTags] = useState<string[]>(tags);

  useEffect(() => {
    const newAvailableTags = tags.reduce((acc: string[], tag) => {
      if (selectedTags.indexOf(tag) < 0) {
        acc.push(tag);
        return acc;
      } else {
        return acc;
      }
    }, []);

    setAvailableTags(newAvailableTags);
  }, [selectedTags]);

  useEffect(() => {
    const index = availableTags.indexOf(tag);

    if (index < 0) {
      return;
    }

    const firstHalf = availableTags.slice(0, index);
    const secondHalf = availableTags.slice(index + 1);

    setAvailableTags(firstHalf.concat(secondHalf));

    setSelectedTags([...selectedTags, tag]);
  }, [tag]);

  return (
    <div>
      <Input
        value={tag}
        onChange={event => {
          changeTag(event);
        }}
        type='select'
        label='Tags'
        placeholder='Select something'
        options={availableTags}
      />
    </div>
  );
}
