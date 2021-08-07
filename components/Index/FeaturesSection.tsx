import React from 'react';

import Text from '@components/common/Text';

interface Features {
  id?: number;
  title: string;
  description: string;
}

function Feature(props: Features) {
  return (
    <article>
      <Text type='h3' className='text-primary-500 mb-4'>
        {props.title}
      </Text>
      <Text type='paragraph' className='text'>
        {props.description}
      </Text>
    </article>
  );
}

export default function FeaturesSection() {
  const items: Features[] = [
    {
      id: 1,
      title: 'Save your recipes',
      description:
        'Store all your precious recipes in one place. Access them on your desktop or phone. All sync.',
    },
    {
      id: 2,
      title: 'Plan your meals',
      description:
        'Create a plan for your week. We automaticly generate for you a shopping list so you can focus on the import part of your life - eating.',
    },
    {
      id: 3,
      title: 'Share and discover',
      description:
        'Share your recipes with the outside world. Meet new people with amazing recipes. Find your new favorite dinner, all in one app.',
    },
  ];

  return (
    <section id='features' className='pt-16 lg:pt-24'>
      <Text type='h2' className='text-center mb-4'>
        We are hungry, we want to eat{' '}
        <span className='text-primary-500'>now</span>
      </Text>
      <Text type='paragraph' className='text-center mb-6'>
        We give a lot of options for your needs. Create your meal plan, save all
        your recipes and share with your frieds.
      </Text>
      <section className='py-4 w-full lg:w-10/12 mx-auto px-4 grid lg:grid-cols-3 gap-6'>
        {items.map(item => (
          <Feature
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </section>
  );
}
