import Image from 'next/image';
import React from 'react';

export default function IndexIllustration() {
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true);
      return;
    }
  }, []);

  return (
    <figure className='relative w-full h-[100vw] lg:h-[70vh]'>
      {mobile ? (
        <Image
          src={'/mobileIlustration.svg'}
          layout='fill'
          objectFit='scale-down'
          priority={true}
          alt='A recipe illustration'
        />
      ) : (
        <Image
          src={'/Illustration.svg'}
          layout='fill'
          priority={true}
          alt='A recipe illustration'
          objectFit='scale-down'
        />
      )}
    </figure>
  );
}
