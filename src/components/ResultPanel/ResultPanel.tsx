import { FC } from "react";
import { ExerciseModel } from "../../interfaces/exerciseModel.ts";
import Exercise from "../Exercise/Exercise.tsx";
import styles from "./ResultPanel.module.scss";

interface ResultPanelProps {
  exercises: ExerciseModel[];
}

const ResultPanel: FC<ResultPanelProps> = ({ exercises }) => {
  return (
    <div className={styles.ResultPanel}>
      <div>Exercises:</div>
      <div className={styles.Exercises}>
        {exercises.map((exercise, index) => (
          <Exercise key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ResultPanel;
