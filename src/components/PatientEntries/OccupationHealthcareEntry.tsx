import {
  Diagnose,
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
} from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import { nanoid } from "nanoid";

type Props = {
  entry: OccupationalHealthcareEntryType;
  diagnoses: Diagnose[];
  style: object;
};

const OccupationHealthcareEntry = ({ entry, diagnoses, style }: Props) => {
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
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p style={{ fontStyle: "italic" }}>{entry.description}</p>
      <ul>{allDiagnoses}</ul>
      <h4>diagnose by {entry.specialist}</h4>
    </div>
  );
};

export default OccupationHealthcareEntry;
