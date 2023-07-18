import React, { FC, useEffect, useState } from "react";
import { Config } from "../../interfaces/config.ts";
import { Operation, OPERATIONS } from "../../interfaces/operation.ts";
import styles from "./ConfigPanel.module.scss";

interface ConfigPanelProps {
  onConfigChange: (config: Config) => void;
}

const ConfigPanel: FC<ConfigPanelProps> = ({ onConfigChange }) => {
  const [exerciseCount, setExerciseCount] = useState<number>(10);
  const [boundary, setBoundary] = useState<number>(20);
  const [selectedOperation, setSelectedOperation] = useState<Operation>(
    OPERATIONS[0],
  );

  const handleExerciseCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setExerciseCount(parseInt(event.target.value));
  };

  const handleBoundaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoundary(parseInt(event.target.value));
  };

  const handleOperationClick = (operation: Operation) => {
    setSelectedOperation(operation);
  };

  useEffect(() => {
    onConfigChange({ exerciseCount, boundary, operation: selectedOperation });
  }, [exerciseCount, boundary, selectedOperation]);

  return (
    <div className={styles.ConfigPanel}>
      <div className={styles.Input}>
        <label>Exercise Count:</label>
        <input
          type="number"
          value={exerciseCount}
          onChange={handleExerciseCountChange}
        />
      </div>

      <div className={styles.Input}>
        <label>Boundary:</label>
        <input type="number" value={boundary} onChange={handleBoundaryChange} />
      </div>

      <div>Select operation</div>
      <div>
        {OPERATIONS.map((operation) => (
          <button
            key={operation.type}
            onClick={() => handleOperationClick(operation)}
            style={{
              backgroundColor:
                selectedOperation === operation ? "green" : "inherit",
            }}
            disabled={
              operation.type === "multiply" || operation.type === "divide"
                ? boundary === 1
                : false
            }
          >
            {operation.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigPanel;
