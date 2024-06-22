import { Link } from "react-router-dom";

import "@/styles/notFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="wrap-404">
        <div className="label">O-o-oh! Something broke.</div>
        <div className="numbers">
          <div className="number">
            <div className="four" />
          </div>
          <div className="number">
            <div className="zero">
              <span />
            </div>
          </div>
          <div className="number">
            <div className="four last" />
          </div>
        </div>
        <div className="text-info">
          <p>Looks like you got lost... Or we trying to confuse you...</p>
          <p>
            Let us bring you at <Link to="/">Home</Link>.
          </p>
        </div>
        <div className="sleep-walker">
          <div className="man">
            <div className="head" />
            <div className="torso">
              <div className="arm-a" />
              <div className="arm-b" />
            </div>
            <div className="legs">
              <div className="leg-a" />
              <div className="leg-b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
