import SelectCountry from "@/app/_components/SelectCountry";
import UpdataProfileForm from "@/app/_components/UpdataProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import Image from "next/image";
const metadata = {
  title: "profile",
};
export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);
  // CHANGE

  return (
    <div>
      <h2 className='font-semibold text-2xl text-yellow-400 mb-4'>
        Update your guest profile
      </h2>

      <p className='text-lg mb-8 text-blue-200'>
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdataProfileForm guest={guest}>
        <SelectCountry
          name='nationality'
          id='nationality'
          className='px-5 py-3 bg-blue-200 text-blue-800 w-full shadow-sm rounded-sm'
          defaultCountry={guest.nationality}
        />
      </UpdataProfileForm>
    </div>
  );
}
