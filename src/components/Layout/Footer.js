import React from "react";
import { formateDate } from "core-functions/getReadbledate";

function App() {
  return (
    <div className="container-fluid footer__admin">
      <div className="rowsd">
        <div className="colxc">
          <h1 className="titla_block">
            <span className="badge badge-pill badge-primary"></span>
          </h1>
          <h1 className="under_title_block">
            Wealthface@{formateDate(new Date())}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
