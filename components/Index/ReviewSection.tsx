import Text from '@components/common/Text';
import Card from '@components/common/Card';
import React from 'react';

interface Review {
  text: string;
  author: string;
}

function Review({ text, author }: Review) {
  return (
    <Card>
      <Text type='paragraph' className='text mb-4'>
        {text}
      </Text>
      <p className='text-sm font-bold tracking-wider text-primary-500 text-right'>
        {author}
      </p>
    </Card>
  );
}

export default function ReviewSection() {
  const items: Review[] = [
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis tenetur! Sapiente, fugit harum, non molestias commodi eveniet optio quas atque, itaque nisi voluptates recusandae.',
      author: 'Test Author',
    },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis tenetur! Sapiente, fugit harum, non molestias commodi eveniet optio quas atque, itaque nisi voluptates recusandae.',
      author: 'Test Author',
    },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis tenetur! Sapiente, fugit harum, non molestias commodi eveniet optio quas atque, itaque nisi voluptates recusandae.',
      author: 'Test Author',
    },
    {
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, perferendis tenetur! Sapiente, fugit harum, non molestias commodi eveniet optio quas atque, itaque nisi voluptates recusandae.',
      author: 'Test Author',
    },
  ];

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
          className='grid lg:grid-cols-2 gap-6 items-center'>
          {items.map((item, index) => (
            <Review
              key={`review-${index}`}
              text={item.text}
              author={item.author}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
