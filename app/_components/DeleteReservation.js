"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure to delete this booking?"))
      startTransition(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className='group flex items-center gap-2 uppercase text-xs font-bold text-blue-300 flex-grow px-3 hover:bg-amber-600 transition-colors hover:text-blue-900 cursor-pointer'
    >
      {!isPending ? (
        <>
          <span className='mt-1'>Delete</span>
          <TrashIcon className='h-5 w-5 text-blue-600 group-hover:text-blue-800 transition-colors' />
        </>
      ) : (
        <span className='mx-5'>
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}
export default DeleteReservation;
