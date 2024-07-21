import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  const mins = Math.floor(secondRemaining / 60);
  const secs = secondRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins} : {secs}{" "}
    </div>
  );
}
export default Timer;
