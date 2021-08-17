import Input from '@components/common/Input';
import Label from '@components/common/Label';
import { useTextInput } from '@hooks/formHooks';
import React, { useEffect, useState } from 'react';

interface Props {
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
}

export default function TagSelector({ selectedTags, setSelectedTags }: Props) {
  const tags: string[] = [
    'main dish',
    'complement',
    'dessert',
    'vegan',
    'vegetarian',
    'meat',
    'chicken',
    'fish',
    'pork',
  ];

  // const [tag, changeTag] = useTextInput('');

  // useEffect(() => {
  //   const newAvailableTags = tags.reduce((acc: string[], tag) => {
  //     if (selectedTags.indexOf(tag) < 0) {
  //       acc.push(tag);
  //       return acc;
  //     } else {
  //       return acc;
  //     }
  //   }, []);

  //   setAvailableTags(newAvailableTags);
  // }, [selectedTags]);

  // useEffect(() => {
  //   const index = availableTags.indexOf(tag);

  //   if (index < 0) {
  //     return;
  //   }

  //   const firstHalf = availableTags.slice(0, index);
  //   const secondHalf = availableTags.slice(index + 1);

  //   setAvailableTags(firstHalf.concat(secondHalf));

  //   setSelectedTags([...selectedTags, tag]);
  // }, [tag]);

  // Tag clicked
  const [tag, setTag] = useState<null | string>(null);
  // Array with availabe Tags
  const [availableTags, setAvailableTags] = useState<string[]>(tags);

  function addTag(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;

    if (newValue === 'null') {
      setTag(null);
      return;
    }

    setTag(event.target.value);
  }

  function deleteTag(value: string) {
    const newSelectedTags = selectedTags.filter(tag => {
      if (tag === value) {
        return false;
      }

      return true;
    });

    setAvailableTags(prev => [...prev, value]);
    setSelectedTags([...newSelectedTags]);
    setTag(null);
  }

  useEffect(() => {
    const newAvailableTags = availableTags.filter(item => {
      if (item === tag) {
        return false;
      }

      return true;
    });
    const selectedTag = availableTags.filter(item => {
      if (item === tag) {
        return true;
      }

      return false;
    });

    setAvailableTags(newAvailableTags);
    setSelectedTags([...selectedTags, ...selectedTag]);
  }, [tag]);

  return (
    <section>
      <section className='w-full'>
        <label className='inline-block mb-1 font-bold tracking-wide text-primary-600'>
          Tags
        </label>
        <select
          value={tag ? tag : ''}
          onChange={addTag}
          className='w-full text-base bg-white p-2 rounded shadow-sm border border-gray-300 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200'>
          <option value='null'>Select a tag</option>
          {availableTags.map(tag => (
            <option key={`${tag}`} value={tag}>
              {tag[0].toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </section>

      <section className='grid grid-cols-4 gap-4 mt-4 justify-items-center'>
        {selectedTags.length === 0 ? (
          <p className='text-sm text-gray-600 tracking-tight'>
            No selected tags.
          </p>
        ) : (
          selectedTags.map((tag, index) => (
            <Label
              onClick={() => deleteTag(tag)}
              key={`tag-${index}`}
              type={tag}>
              {tag[0].toUpperCase() + tag.slice(1)}
            </Label>
          ))
        )}
      </section>
    </section>
  );
}
