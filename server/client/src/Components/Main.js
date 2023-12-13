import Filters from "./Filters";

const Main = (props) => {
  return (
    <div>
      <div className="backgroundMain">
        <div className="top">
          <h1
            style={{
              fontSize: "5em",
              textAlign: "left",
              marginLeft: "30px",
              marginTop: "80px",
              marginBottom: "10px",
            }}
          >
            MY COOKING APP
          </h1>
          <h3
            style={{
              textAlign: "left",
              fontStyle: "italic",
              fontSize: "2em",
              fontWeight: "lighter",
              marginLeft: "110px",
              marginTop: "10px",
            }}
          >
            Discover your possibilities
          </h3>
        </div>

        <div className="bot">
          <p
            style={{
              fontSize: "3em",
              backgroundColor: "rgba(128,128,128,0.50)",
              padding: "50px",
              margin: 0,
            }}
          >
            Step by step recipes
          </p>
        </div>
      </div>
      <Filters />
    </div>
  );
};

export default Main;
