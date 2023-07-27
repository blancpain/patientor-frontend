import {
  HealthCheckEntry as HealthCheckEntryType,
  Diagnose,
} from "../../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { nanoid } from "nanoid";

type Props = {
  entry: HealthCheckEntryType;
  diagnoses: Diagnose[];
  style: object;
};

const HealthCheckEntry = ({ entry, diagnoses, style }: Props) => {
  const allDiagnoses = entry.diagnosisCodes?.map((code) => {
    const matchingDiagnose = diagnoses.find(
      (diagnose) => diagnose.code === code
    );

    return (
      <li key={nanoid()}>
        {code} {matchingDiagnose?.name}
      </li>
    );
  });
  return (
    <div style={style}>
      <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <p style={{ fontStyle: "italic" }}>{entry.description}</p>
      <ul>{allDiagnoses}</ul>
      <h4>diagnose by {entry.specialist}</h4>
    </div>
  );
};

export default HealthCheckEntry;
