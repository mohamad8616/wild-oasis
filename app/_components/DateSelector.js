"use client";
import { useReservation } from "@/app/_components/ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  const { range, setRange, resetRange } = useReservation(); // CHANGE
  const { regularPrice, discount } = cabin;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * regularPrice - discount;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const defaultClassNames = getDefaultClassNames();
  return (
    <div className='flex flex-col justify-between '>
      <DayPicker
        className='pt-12 place-self-center '
        mode='range'
        onSelect={(range) => setRange(range)}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        classNames={{
          today: `border-amber-500`, // Add a border to today's date
          selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
          root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
          range_middle: `bg-amber-500 rounded-full`,
          range_start: `bg-amber-500 rounded-full`,
          range_end: `bg-amber-500 rounded-full`,
          day_button: `hover:bg-amber-500 py-2.5 px-4 rounded-full cursor-pointer`,
        }}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(currDate) => {
          return (
            isPast(currDate) ||
            bookedDates.some((date) => isSameDay(date, currDate))
          );
        }}
      />

      <div className='flex items-center justify-between px-8 bg-yellow-500 text-blue-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-blue-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-yellow-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{" "}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className='border border-blue-800 py-2 px-4 text-sm font-semibold'
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
