import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Config, defaultConfig } from "../../interfaces/config.ts";
import { ExerciseModel } from "../../interfaces/exerciseModel.ts";
import { Operation } from "../../interfaces/operation.ts";
import ConfigPanel from "../ConfigPanel/ConfigPanel.tsx";
import Header from "../Header/Header.tsx";
import ResultPanel from "../ResultPanel/ResultPanel.tsx";
import styles from "./MathExerciseGenerator.module.scss";

const EXERCISES_COUNT = 10;

function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

function generateExercise(op: Operation, boundary: number): ExerciseModel {
  let n1, n2, res;

  switch (op.type) {
    case "add":
      n1 = generateRandomNumber(boundary - 1);
      n2 = generateRandomNumber(boundary - n1);
      res = n1 + n2;
      break;
    case "subtract":
      res = generateRandomNumber(boundary - 1);
      n2 = generateRandomNumber(boundary - res);
      n1 = res + n2;
      break;
    case "multiply":
      do {
        n1 = generateRandomNumber(Math.floor(Math.sqrt(boundary)));
        n2 = generateRandomNumber(Math.floor(boundary / n1));
      } while (n1 === 1 || n2 === 1);
      res = n1 * n2;
      break;
    case "divide":
      do {
        res = generateRandomNumber(Math.floor(Math.sqrt(boundary)));
        n2 = generateRandomNumber(Math.floor(boundary / res));
        n1 = res * n2;
      } while (n1 === 1 || n2 === 1 || res === 1);
      break;
  }

  console.log(`${n1} ${op.symbol} ${n2} = ${res}`);

  return {
    n1,
    n2,
    res,
    op,
  };
}

function generateExercises(
  operation: Operation,
  boundary: number,
): ExerciseModel[] {
  const exercises: Set<string> = new Set();
  const maxAttempts = 100;
  let attempts = 0;

  while (exercises.size < EXERCISES_COUNT && attempts < maxAttempts) {
    const exercise = JSON.stringify(generateExercise(operation, boundary));
    exercises.add(exercise);
    attempts++;
  }

  return Array.from(exercises).map((exercise) => JSON.parse(exercise));
}

function MathExerciseGenerator() {
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const componentRef = useRef(null);

  const handleConfigChange = (config: Config) => {
    setConfig(config);
  };

  const handleGenerateExercises = () => {
    const generatedExercises = generateExercises(
      config.operation,
      config.boundary,
    );
    setExercises(generatedExercises);
  };

  return (
    <div className={styles.MathExerciseGenerator}>
      <Header />
      <div className={styles.Body}>
        <ConfigPanel onConfigChange={handleConfigChange} />
        <button onClick={handleGenerateExercises}>Generate Exercises</button>
        <ReactToPrint
          trigger={() => <button disabled={!exercises.length}>Print</button>}
          content={() => componentRef.current}
        />
        <ResultPanel exercises={exercises} ref={componentRef} />
      </div>
    </div>
  );
}

export default MathExerciseGenerator;
