import { HospitalEntry as HospitalEntryType, Diagnose } from "../../types";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { nanoid } from "nanoid";

type Props = {
  entry: HospitalEntryType;
  diagnoses: Diagnose[];
  style: object;
};

const HospitalEntry = ({ entry, diagnoses, style }: Props) => {
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
        {entry.date} <LocalPharmacyIcon />
      </p>
      <p style={{ fontStyle: "italic" }}>{entry.description}</p>
      <ul>{allDiagnoses}</ul>
      <h4>diagnose by {entry.specialist}</h4>
    </div>
  );
};

export default HospitalEntry;
