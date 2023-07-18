import React from "react";
import { ExerciseModel } from "../../interfaces/exerciseModel.ts";
import Exercise from "../Exercise/Exercise.tsx";
import styles from "./ResultPanel.module.scss";

interface ResultPanelProps {
  exercises: ExerciseModel[];
}

const ResultPanel = React.forwardRef<HTMLDivElement, ResultPanelProps>(
  ({ exercises }, ref) => {
    return (
      <div ref={ref} className={styles.ResultPanel}>
        <div className={styles.Title}>תרגילים של אלופים</div>
        <div className={styles.Exercises}>
          {exercises.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} />
          ))}
        </div>
      </div>
    );
  },
);

export default ResultPanel;
