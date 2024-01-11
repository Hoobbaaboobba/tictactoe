import { ScaleLoader } from "react-spinners";

const LoadingState = () => {
  return (
    <>
      <div className="dark:hidden block">
        <ScaleLoader color="#ffffff" height={15} width={3} />
      </div>
      <div className="dark:block hidden">
        <ScaleLoader color="#000000" height={15} width={3} />
      </div>
    </>
  );
};

export default LoadingState;
