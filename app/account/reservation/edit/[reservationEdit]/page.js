// "use client";
import SubmitButton from "@/app/_components/SubmitButton";
import { ReservationEdit } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const booking = await getBooking(params.reservationEdit);
  const { id: reservationId, observations, numGuests, cabinId } = booking;
  const cabin = await getCabin(cabinId);
  // const
  const maxCapacity = cabin.maxCapacity;

  // CHANGE

  return (
    <div>
      <h2 className='font-semibold text-2xl text-amber-400 mb-7'>
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={ReservationEdit}
        className='bg-blue-900 py-8 px-12 text-lg flex gap-6 flex-col'
      >
        <input type='hidden' name='reservationId' value={reservationId} />
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-blue-200 text-blue-800 w-full shadow-sm rounded-sm'
            required
            defaultValue={numGuests}
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            className='px-5 py-3 bg-blue-200 text-blue-800 w-full shadow-sm rounded-sm'
            defaultValue={observations}
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          <SubmitButton updatingLabel='Updating reservation...'>
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
