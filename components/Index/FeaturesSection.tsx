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
      <Text type='h3' className='text-primary-500 mb-1'>
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
        'Store all your precious recipes in one place. Use your PC or phone to access them. Fantastic.',
    },
    {
      id: 2,
      title: 'Share and discover',
      description:
        'Share your recipes with the world. Find recipes from every user, and create a bookmark list.',
    },
    {
      id: 3,
      title: 'Make your shopping easier',
      description:
        'Use our shopping lists to access the ingredients of a recipe. Go to the market, and shop faster than ever.',
    },
  ];

  return (
    <section id='features' className='pt-16 lg:pt-24'>
      <Text type='h2' className='text-center mb-2'>
        We are hungry, we want to eat
        <span className='text-primary-500'> now</span>
      </Text>
      <Text type='paragraph' className='text-center mb-6 px-4'>
        A ton of recipes, cookbooks and blogs. Is really tiresome, and you want
        to eat. Forget about all that with Recipe Keeper.
      </Text>
      <section className='py-4 w-full lg:w-10/12 mx-auto px-4 grid lg:grid-cols-3 gap-12'>
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
