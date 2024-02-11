import React from "react";
import StateWiseSummary from "./components/StatewiseSummary";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>State-wise Summary</h1>
      </header> */}
      <Header />
      <StateWiseSummary />
    </div>
  );
}

export default App;
