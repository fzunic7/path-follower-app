import React, { useState } from "react";
import { followPath } from "../utils/pathFollower";
// eslint-disable-next-line no-unused-vars
import { VALID_MAPS, INVALID_MAPS } from "./constants";

const PathFollowerComponent = () => {
  const [result, setResult] = useState({ collectedLetters: "", path: "" });
  const [error, setError] = useState("");

  const mapName = "IGNORE_AFTER_END"; // Change the map name here
  const selectedMap = VALID_MAPS[mapName];

  const handleRun = () => {
    try {
      const { map } = selectedMap;
      const result = followPath(map);
      setResult(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult({ collectedLetters: "", path: "" });
    }
  };

  return (
    <div>
      <h1>Path Follower</h1>
      <button onClick={handleRun}>Follow Path</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <p>Collected Letters: {result.collectedLetters}</p>
      <p>Path: {result.path}</p>
    </div>
  );
};

export default PathFollowerComponent;
