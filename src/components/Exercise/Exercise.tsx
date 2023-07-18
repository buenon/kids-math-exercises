import { FC } from "react";
import { ExerciseModel } from "../../interfaces/exerciseModel.ts";
import styles from "./Exercise.module.scss";

interface ExerciseProps {
  exercise: ExerciseModel;
}

const Exercise: FC<ExerciseProps> = ({ exercise }) => (
  <div className={styles.Exercise}>
    <div className={styles.Content}>
      <div className={styles.Op}>{exercise.op.symbol}</div>
      <div className={styles.Numbers}>
        <div>{exercise.n1}</div>
        <div>{exercise.n2}</div>
      </div>
    </div>
  </div>
);

export default Exercise;
