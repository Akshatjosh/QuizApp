function NextButton({ dispatch, answer, index }) {
  if (answer === null) {
    return null;
  }
  if (index <= 13) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextquestion" })}
      >
        Next
      </button>
    );
  }
  if (index === 14) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finish
      </button>
    );
  }
}
export default NextButton;
