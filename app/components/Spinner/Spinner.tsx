import { RotatingLines } from 'react-loader-spinner';

function Spinner() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="4"
      animationDuration="0.75"
      width="48"
      visible={true}
    />
  );
}

export { Spinner };
