import Text from '@components/common/Text';
import Card from '@components/common/Card';
import React from 'react';
import { Review as ReviewInterface } from '@lib/supabase';

interface Props {
  items: ReviewInterface[];
}

function Review({ author, review }: ReviewInterface) {
  return (
    <Card>
      <Text type='paragraph' className='text mb-6'>
        {`"${review}"`}
      </Text>
      <p className='text-gray-400 text-right'>{author}</p>
    </Card>
  );
}

export default function ReviewSection({ items }: Props) {
  return (
    <section id='users' className='py-12 lg:flex pt-16 lg:pt-24'>
      <figure className='users--image mb-6 lg:mb-0'></figure>

      <section className='w-full px-4'>
        <Text type='h2' className='mb-4'>
          Those who <span className='text-primary-500'>try it</span>
          {` don't go
      back to cookbooks`}
        </Text>
        <section
          id='reviews'
          className='grid lg:grid-cols-2 gap-8 items-center'>
          {items.map((item, index) => (
            <Review
              key={`review-${index}`}
              review={item.review}
              author={item.author}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
