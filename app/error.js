"use client";
export default function Error({ error, reset }) {
  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}!</p>

      <button
        onClick={reset}
        className='inline-block bg-yellow-500 text-blue-800 px-6 py-3 text-lg cursor-pointer'
      >
        Try again
      </button>
    </main>
  );
}
