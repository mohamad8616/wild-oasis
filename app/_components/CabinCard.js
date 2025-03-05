import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  console.log(image);
  return (
    <div className='flex border-blue-800 border'>
      <div className='flex-1 relative'>
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className='flex-1 border-r border-blue-800 object-cover'
        />
      </div>

      <div className='flex-grow'>
        <div className='pt-5 pb-4 px-7 bg-blue-950'>
          <h3 className='text-yellow-500 font-semibold text-2xl mb-3'>
            Cabin {name}
          </h3>

          <div className='flex gap-3 items-center mb-2'>
            <UsersIcon className='h-5 w-5 text-blue-600' />
            <p className='text-lg text-blue-200'>
              For up to <span className='font-bold'>{maxCapacity}</span> guests
            </p>
          </div>

          <p className='flex gap-3 justify-end items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-3xl font-[350]'>
                  ${regularPrice - discount}
                </span>
                <span className='line-through font-semibold text-blue-600'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-3xl font-[350]'>${regularPrice}</span>
            )}
            <span className='text-blue-200'>/ night</span>
          </p>
        </div>

        <div className='bg-blue-950 border-t border-t-blue-800 text-right'>
          <Link
            href={`/cabins/${id}`}
            className='border-l border-blue-800 py-4 px-6 inline-block hover:bg-yellow-600 transition-all hover:text-blue-900'
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
