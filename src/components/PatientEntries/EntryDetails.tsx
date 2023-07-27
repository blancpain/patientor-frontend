import { Diagnose, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationHealthcareEntry from "./OccupationHealthcareEntry";

type Props = {
  entry: Entry;
  diagnoses: Diagnose[];
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const entryStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "5px",
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <HealthCheckEntry
          entry={entry}
          style={entryStyle}
          diagnoses={diagnoses}
        />
      );

    case "Hospital":
      return (
        <HospitalEntry entry={entry} style={entryStyle} diagnoses={diagnoses} />
      );

    case "OccupationalHealthcare":
      return (
        <OccupationHealthcareEntry
          entry={entry}
          style={entryStyle}
          diagnoses={diagnoses}
        />
      );

    default:
      assertNever(entry);
      return null;
  }
};

export default EntryDetails;
