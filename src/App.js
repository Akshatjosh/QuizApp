import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";
const secperQuestion = 30;
const initialstate = {
  questions: [],
  //loading,error,ready,active,complete
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.data, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * secperQuestion,
      };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.data,
        points:
          action.data === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "timer":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialstate);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", data: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const numquestions = questions.length;
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen num={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              point={points}
              numquestions={numquestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished points={points} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}
export default App;
