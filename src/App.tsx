import { useEffect } from "react";

import "./App.css";
import { useState } from "react";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${("0" + minutes).slice(-2)}:${("0" + remainingSeconds).slice(-2)}`;
}

function App() {
  const [breakl, setbreakl] = useState(5);
  const [sessionl, setsessionl] = useState(25);
  const [Running, setRunning] = useState(false);
  const [sessiontime, setsessiontime] = useState(sessionl * 60);
  const [breaktime, setbreaktime] = useState(breakl * 60);
  const [sessionEnded, setsessionEnded] = useState(false);
  const handlereset = () => [setsessiontime(1500)];

  useEffect(() => {
    let interval: number;
    if (Running) {
      interval = setInterval(() => {
        setsessiontime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setsessionEnded(true);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [Running]);
  useEffect(() => {
    let interval: number;
    if (sessionEnded) {
      interval = setInterval(() => {
        setbreaktime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setsessiontime(sessionl * 60);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionEnded]);

  return (
    <>
      <header>
        <h1 className="p-5">25 + 5 Clock</h1>
      </header>
      <div className="clockcontainer grid grid-cols-2 gap-12 p-5">
        <div className="break-len-cont">
          <div id="break-label" className="break text-3xl">
            Break Length
          </div>
          <div
            id="break-length"
            className="flex items-center justify-center gap-2 text-2xl"
          >
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
            </button>{" "}
            {breakl}
            <button
              id="break-increment"
              className="text-white"
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
        </div>
        <div className="session-len-cont">
          <div id="session-label" className="text-3xl">
            Session Length
          </div>
          <div
            id="session-length"
            className="flex items-center justify-center gap-2 text-2xl"
          >
            <button
              id="session-decrement"
              onClick={() => {
                setsessionl((prevsessionl) => {
                  const newSessionl = prevsessionl - 1;
                  setsessiontime(newSessionl * 60);
                  return newSessionl;
                });
              }}
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
            {sessionl}
            <button
              id="session-increment"
              onClick={() => {
                setsessionl((prevsessionl) => {
                  const newSessionl = prevsessionl + 1;
                  setsessiontime(newSessionl * 60);
                  return newSessionl;
                });
              }}
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
      </div>
      <div className="time-label rounded-[50px] border-8 border-solid border-[#13353a]">
        <div className="timewrapper">
          {sessiontime != 0 ? (
            <div className="head text-[30px]">Session</div>
          ) : null}
          {sessiontime == 0 ? (
            <div className="head text-[30px]">Break Time</div>
          ) : null}
          <div className="currenttime text-[80px]">
            {sessiontime != 0 ? formatTime(sessiontime) : formatTime(breaktime)}
          </div>
        </div>
      </div>
      <div className="timer-control">
        <button className="start-stop" onClick={() => setRunning(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M8 18.3915V5.60846L18.2264 12L8 18.3915ZM6 3.80421V20.1957C6 20.9812 6.86395 21.46 7.53 21.0437L20.6432 12.848C21.2699 12.4563 21.2699 11.5436 20.6432 11.152L7.53 2.95621C6.86395 2.53993 6 3.01878 6 3.80421Z"></path>
          </svg>
        </button>
        <button className="start-stop" onClick={() => setRunning(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M5 5H19V19H5V5ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4Z"></path>
          </svg>
        </button>
        <button className="reset" onClick={handlereset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="currentColor"
          >
            <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}

export default App;
