"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, updatingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='bg-yellow-500 px-8 py-4 text-blue-800 font-semibold hover:bg-yellow-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer'
    >
      {pending ? updatingLabel : children}
    </button>
  );
}
export default SubmitButton;
