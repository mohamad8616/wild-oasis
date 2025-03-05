import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main className='mt-24 '>
      <Image
        src={bg}
        fill
        placeholder='blur'
        quality={80}
        className='object-cover object-top'
        alt='Mountains and forests with two cabins'
      />

      <div className='relative z-10 text-center'>
        <h1 className='text-8xl text-blue-50 mb-10 tracking-tight font-normal'>
          Welcome to paradise.
        </h1>
        <Link
          href='/cabins'
          className='bg-yellow-500 px-8 py-6 text-blue-800 text-lg font-semibold hover:bg-yellow-600 transition-all'
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
