export default function Page() {
  return (
    <div className='text-center space-y-6 mt-4'>
      <h1 className='text-3xl font-semibold'>
        Thank you for your reservation!
      </h1>
      <a
        href='/account/reservation'
        className='underline text-xl text-amber-500 inline-block'
      >
        Manage your reservations &rarr;
      </a>
    </div>
  );
}
