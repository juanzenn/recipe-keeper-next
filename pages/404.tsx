import GoBack from '@components/common/GoBack';

export default function Custom404() {
  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-primary-800 font-bold mb-2'>
        404 - Page Not Found
      </h1>
      <p className='text-gray-600 text-lg mb-6'>{`This page may be unavailable or doesn't exist. Try again later or go back.`}</p>

      <section>
        <GoBack />
      </section>
    </section>
  );
}
