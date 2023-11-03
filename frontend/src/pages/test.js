import GetLoan from "../components/GetLoan";
import React from "react";

function LoanTest({creditValue}) {
    console.log('creditValue', creditValue);
  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <GetLoan creditValue={creditValue}/>
    </div>
  );
}

export default LoanTest;