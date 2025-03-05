import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function SignOutButton() {
  return (
    <button className='py-3 px-5 hover:bg-blue-900 hover:text-blue-100 transition-colors flex items-center gap-4 font-semibold text-blue-200 w-full'>
      <ArrowRightOnRectangleIcon className='h-5 w-5 text-blue-600' />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
