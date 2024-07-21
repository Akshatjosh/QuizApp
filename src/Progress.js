function Progress({ index, point, answer, numquestions }) {
  return (
    <header className="progress">
      <progress max={numquestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {15}
      </p>
      <p>
        Points :<strong> {point}</strong>
      </p>
    </header>
  );
}
export default Progress;
