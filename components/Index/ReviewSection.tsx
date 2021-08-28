import Text from '@components/common/Text';
import Card from '@components/common/Card';
import React from 'react';
import { Review as ReviewInterface } from '@lib/supabase';
import Image from 'next/image';

interface Props {
  items: ReviewInterface[];
}

export default function ReviewSection({ items }: Props) {
  return (
    <section id='users' className='py-12 lg:flex pt-16 lg:pt-24 min-h-[80vh]'>
      <figure className='relative w-full h-[80vh] mb-6 lg:mb-0'>
        <Image
          src={'/customers.jpg'}
          layout='fill'
          alt='happy customers'
          objectFit='cover'
          objectPosition='top'
        />
        <div className='absolute w-full h-full bg-gradient-to-br from-primary-400/40 to-primary-600/40 z-10'></div>
      </figure>

      <section className='w-full min-h-[80vh] px-4 lg:px-8 flex flex-col justify-center'>
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

function Review({ author, review }: ReviewInterface) {
  return (
    <Card>
      <Text type='paragraph' className='prose-lg text-gray-600 mb-6'>
        {`"${review}"`}
      </Text>
      <p className='text-gray-400 text-right text-sm'>{author}</p>
    </Card>
  );
}
