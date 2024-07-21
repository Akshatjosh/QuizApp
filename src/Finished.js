function Finished({ points, dispatch }) {
  return (
    <>
      <p className="result">
        You scored <strong> {points} </strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
export default Finished;
