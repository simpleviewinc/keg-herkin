import React from "react";
import expect from "expect";
import "./styles.css";
import { describe, test, run } from "jest-circus-browser";

const defaultTestSnippet = `
      describe('basic math', () => {<br/>
     &nbsp&nbsp;test('addition', () => {<br/>
      &nbsp;&nbsp;&nbsp&nbsp;expect(1+1).toBe(2);<br/>
      &nbsp;&nbsp;})<br/>
      &nbsp&nbsp;test('subtraction', () => {<br/>
        &nbsp;&nbsp;&nbsp&nbsp;expect(1+1).toBe(0);<br/>
        &nbsp;&nbsp;})<br/>
      });
    `;

const TestResults = ({ data }) => {
  return data.map((result) => {
    const { testPath, errors } = result;
    // eslint-disable-next-line
    const [_, block, description] = testPath;
    let idx;

    if (errors.length) {
      idx = errors[0].indexOf(" at ");
    }

    return (
      <div key={description}>
        {errors.length ? (
          <div>
            <span className="white pa2 mb2 mr1 dib bg-dark-red">× FAIL</span>
            <span className="white">{" " + block + " "}</span>
            <span className="white">{description}</span>
          </div>
        ) : (
          <div>
            <span className="white pa2 mb2 mr1 dib bg-dark-green">✓ PASS</span>
            <span className="white">{" " + block + " "}</span>
            <span className="white">{description}</span>
          </div>
        )}
        {errors.length > 0 && (
          <div className="red">{errors[0].slice(0, idx)}</div>
        )}
      </div>
    );
  });
};

export default function App() {
  const [jestResults, setJestResults] = React.useState([]);
  const testCount = React.useRef(0);
  React.useEffect(() => {
    const editor = document.getElementById("editor");
    editor.innerHTML = defaultTestSnippet;
  }, []);
  const runTests = async () => {
    const editor = document.getElementById("editor");
    const testCode = editor.innerText;
    // eslint-disable-next-line no-new-func
    const runPromise = Function(`return (describe, test, expect, run) => {
      ${testCode}
      return run()
    }`)()(describe, test, expect, run);

    const { testResults } = await runPromise;

    if (testCount.current === 0) {
      testCount.current = testResults.length;
      setJestResults(testResults);
    } else {
      setJestResults(
        testResults.slice(
          testResults.length - testCount.current,
          testResults.length
        )
      );
    }
  };

  React.useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="helvetica vh-100 pa5 bg-dracula">
      <h1 className="white ma0">In-browser Jest Demo</h1>
      <h2 className="white">
        Start editing the <span className="pink">pink</span> tests to see some
        magic happen. Can you make the tests pass?
      </h2>
      <div id="editor" className="code pink" contentEditable />
      <div id="test-result" className="code pv4">
        <TestResults data={jestResults} />
      </div>
      <button className="mb4" onClick={runTests}>
        Run tests
      </button>
    </div>
  );
}
