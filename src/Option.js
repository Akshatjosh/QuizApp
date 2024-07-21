function Option({ question, dispatch, answer }) {
  const handleDisable = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            handleDisable
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={handleDisable}
          onClick={() => dispatch({ type: "newanswer", data: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Option;
