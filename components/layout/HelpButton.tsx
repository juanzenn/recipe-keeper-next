import { Envelope, FaceHappy, FaceNeutral, FaceSad, Send } from 'akar-icons';
import React, { useRef, useState } from 'react';

import { Review, sendReview } from '@lib/supabase';

export default function HelpButton() {
  const [active, setActive] = useState(false);
  const [happiness, setHappiness] = useState<boolean | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const reviewRef = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReview: Review = {
      author: name.current ? name.current.value : 'Anonymous',
      review: reviewRef.current ? reviewRef.current.value : '',
      positive: happiness,
    };

    const status = await sendReview(newReview);
    setLoading(true);

    setTimeout(() => {
      if (status?.code === 200) {
        setHappiness(null);
        setSuccess(true);
        setLoading(false);
      }
    }, 1000);
  };

  const handleCloseSuccess = async () => {
    setHappiness(null);
    setActive(false);
    setSuccess(false);
  };

  const handleBubble = () => {
    setActive(prev => !prev);
    setLoading(false);
    setSuccess(false);
    setHappiness(null);
  };

  if (loading) {
    return (
      <>
        <div
          onClick={handleBubble}
          className='fixed bottom-4 right-4 lg:right-8 p-3 lg:p-4 rounded-full bg-primary-600 shadow-md cursor-pointer hover:brightness-105 transition-all'>
          <Envelope size={24} className='text-gray-50' />
        </div>
        <section
          className={
            active
              ? 'fixed bottom-20 right-8 w-screen lg:w-[30vw] p-4 rounded-md shadow-md bg-white'
              : 'hidden'
          }>
          <strong className='inline-block text-xl mb-2 text-gray-500'>
            Wait a moment...
          </strong>
        </section>
      </>
    );
  }

  if (success) {
    return (
      <>
        <div
          onClick={handleBubble}
          className='fixed bottom-4 right-4 lg:right-8 p-3 lg:p-4 rounded-full bg-primary-600 shadow-md cursor-pointer hover:brightness-105 transition-all'>
          <Envelope size={24} className='text-gray-50' />
        </div>
        <section
          className={
            active
              ? 'fixed bottom-20 right-8 w-10/12 lg:w-[30vw] p-4 rounded-md shadow-md bg-white'
              : 'hidden'
          }>
          <strong className='inline-block text-xl mb-2 text-green-500'>
            Thank you for your feedback!
          </strong>
          <p className='text-sm text-gray-600 mb-6'>
            Your message was successfully sended.
          </p>

          <button
            onClick={handleCloseSuccess}
            className='px-6 py-2 font-medium tracking-tight text-lg bg-gray-100 hover:bg-gray-200 transition-colors rounded-md shadow'>
            Close this window
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <div
        onClick={handleBubble}
        className='fixed bottom-4 right-4 lg:right-8 p-3 lg:p-4 rounded-full bg-primary-600 shadow-md cursor-pointer hover:brightness-105 transition-all'>
        <Envelope size={24} className='text-gray-50' />
      </div>
      <section
        className={
          active
            ? 'fixed bottom-20 right-8 w-10/12 lg:w-[30vw] p-4 rounded-md shadow-md bg-white'
            : 'hidden'
        }>
        <strong className='inline-block text-xl mb-2'>Leave a review</strong>
        <p className='text-sm text-gray-600 mb-6'>
          Leave your review and let us know what you think. You can also send
          negative feedback, if you want!
        </p>

        <p className='text-xs text-gray-500 mb-2'>My experience was...</p>
        <section className='flex gap-4 items-center mb-4'>
          <FaceSad
            size={20}
            className={
              happiness === false
                ? `text-red-600 transition-all cursor-pointer`
                : 'text-gray-800 cursor-pointer hover:text-gray-600'
            }
            onClick={() => setHappiness(false)}
          />
          <FaceNeutral
            size={20}
            className={
              happiness === null
                ? `text-red-600 transition-all cursor-pointer`
                : 'text-gray-800 cursor-pointer hover:text-gray-600'
            }
            onClick={() => setHappiness(null)}
          />
          <FaceHappy
            size={20}
            className={
              happiness === true
                ? `text-red-600 transition-all cursor-pointer`
                : 'text-gray-800 cursor-pointer hover:text-gray-600'
            }
            onClick={() => setHappiness(true)}
          />
        </section>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='w-3/4 flex flex-col'>
            <label className='text-xs text-gray-500 mb-2'>
              Name (optional)
            </label>
            <input
              ref={name}
              type='text'
              placeholder='Juan Alvarez'
              className='w-full bg-white p-2 rounded shadow-sm border border-gray-300 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200'
            />
          </div>

          <div className='flex items-end gap-2'>
            <div className='w-3/4'>
              <label className='text-xs text-gray-500 mb-2'>Message</label>
              <input
                ref={reviewRef}
                type='text'
                placeholder='I really like this app...'
                className='w-full bg-white p-2 rounded shadow-sm border border-gray-300 hover:border-primary-300 focus:outline-none focus:border-primary-300 focus:ring focus:ring-primary-200'
              />
            </div>
            <button
              type='submit'
              className='w-max rounded-md px-4 py-2 hover:bg-primary-600 hover:text-white transition-all duration-300'>
              <Send size='20' />
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
