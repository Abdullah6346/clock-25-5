import { useEffect } from "react";

import "./App.css";
import { useState } from "react";
function App() {
  const [breakl, setbreakl] = useState(5);
  const [sessionl, setsessionl] = useState(25);
  const [Running, setRunning] = useState(false);
  const [sessiontime, setsessiontime] = useState(sessionl);
  const [breaktime, setbreaktime] = useState(breakl);

  useEffect(() => {
    let interval: number;
    if (Running) {
      interval = setInterval(() => {
        setsessiontime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [Running]);
  return (
    <>
      <header>
        <h1>25 + 5 Clock</h1>
      </header>
      <div className="clockcontainer grid grid-cols-2 gap-12">
        <div className="break-len-cont">
          <div id="break-label" className="break  text-3xl	">
            Break Length
          </div>
          <div id="break-length" className=" text-2xl ">
            {breakl}
          </div>

          <button
            id="break-decrement"
            onClick={() => setbreakl((prevBreakl) => prevBreakl - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
            </svg>
          </button>

          <button
            id="break-increment"
            className=" text-white "
            onClick={() => setbreakl((prevBreakl) => prevBreakl + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
            </svg>
          </button>
        </div>
        <div className="session-len-cont">
          <div id="session-label" className="  text-3xl">
            Session Length
          </div>
          <div id="session-length" className=" text-2xl">
            {sessionl}
          </div>
          <button
            id="session-decrement"
            onClick={() => setsessionl((prevsessionl) => prevsessionl - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
            </svg>
          </button>
          <button
            id="session-increment"
            onClick={() => setsessionl((prevsessionl) => prevsessionl + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
            >
              <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="time-label border-solid border-8 border-[#13353a] rounded-[50px]	">
        <div className="timewrapper">
          <div className="head">Session</div>
          <div className="currenttime">{sessiontime}</div>
        </div>
      </div>
      <div className="timer-control">
        <button className="start-stop" onClick={() => setRunning(true)}>
          Start
        </button>
      </div>
    </>
  );
}

export default App;
