import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className='grid justify-center items-center'>
      <Spinner />
      <p>Loading cabbin data...</p>
    </div>
  );
}

export default loading;
