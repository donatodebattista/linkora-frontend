import type { CSSProperties } from "react"
import { PuffLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Spinner() {

  return (
    <div className="sweet-loading flex justify-center items-center">

      <PuffLoader
        color={'#53eafd'}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}