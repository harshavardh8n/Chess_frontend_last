import chess from "../assets/chess.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#212121] lg:h-screen h-fit w-full">
        <div className="mt-2 flex gap-4 lg:flex-row flex-col">
          <div className="lg:w-1/3 mt-20 lg:ml-20">
            <img src={chess} alt="Chess" />
          </div>
          <div className="m-10 lg:h-[60vh] lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mx-auto">
              Play chess online on the #3 site
            </h1>
            <div className="mt-5 bg-green-600 lg:w-1/4 p-2 rounded-md font-bold mx-auto text-center">
              <button
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play online
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
