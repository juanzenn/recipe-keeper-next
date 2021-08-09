import React from 'react';
import Text from './Text';

interface Props {
  title: string;
  subtitle: string;
}

export default function ViewHeader({ title, subtitle }: Props) {
  return (
    <header className='mb-8'>
      <Text type='h2' className='mb-2'>
        {title}
      </Text>
      <Text type='paragraph'>{subtitle}</Text>
    </header>
  );
}
