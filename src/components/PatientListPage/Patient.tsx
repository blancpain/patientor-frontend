import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";
import patientsService from "./../../services/patients";

//types
import { Diagnose, Patient as PatientType } from "../../types";
import EntryDetails from "../PatientEntries/EntryDetails";

//mui

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

// comps
import Notification from "../Notification";
import HealthCheckForm from "../PatientEntries/EntryForms/HealthCheckForm";
import HospitalForm from "../PatientEntries/EntryForms/HospitalForm";
import OccupationalHealthCareForm from "../PatientEntries/EntryForms/OccupationalHealthcareForm";

type Props = {
  patients: PatientType[];
  diagnoses: Diagnose[];
  setPatients: React.Dispatch<React.SetStateAction<PatientType[]>>;
};

const Patient = ({ patients, diagnoses, setPatients }: Props) => {
  const { id } = useParams();
  const [notification, setNotification] = useState<string>("");
  const [notificationVariant, setNotificationVariant] = useState<string>("");

  const selectedPatient = patients.find((patient) => patient.id === id);
  if (!selectedPatient) return null;

  const allEntries = selectedPatient.entries.map((entry) => {
    return <EntryDetails entry={entry} key={nanoid()} diagnoses={diagnoses} />;
  });

  const createEntry = async (objectToBeAdded: object) => {
    const objectToBeProcessed = await patientsService.createEntry(
      objectToBeAdded,
      id!
    );
    if (typeof objectToBeProcessed !== "string") {
      const updatedEntries =
        selectedPatient.entries.concat(objectToBeProcessed);
      setPatients(
        patients.map((patient) =>
          patient.id === id ? { ...patient, entries: updatedEntries } : patient
        )
      );
    } else {
      setNotification(objectToBeProcessed);
      setNotificationVariant("error");

      setTimeout(() => {
        setNotification("");
        setNotificationVariant("");
      }, 5000);
    }
  };

  return (
    <div>
      <h2>
        {selectedPatient.name}{" "}
        {selectedPatient.gender === "female" && <FemaleIcon />}
        {selectedPatient.gender === "male" && <MaleIcon />}
        {selectedPatient.gender === "other" && <TransgenderIcon />}
      </h2>
      <p>{selectedPatient?.ssn}</p>
      <p>{selectedPatient.occupation}</p>
      <Notification message={notification} variant={notificationVariant} />
      <HealthCheckForm createEntry={createEntry} diagnoses={diagnoses} />
      <HospitalForm createEntry={createEntry} diagnoses={diagnoses} />
      <OccupationalHealthCareForm
        createEntry={createEntry}
        diagnoses={diagnoses}
      />
      <h3>entries</h3>
      <div>{allEntries}</div>
    </div>
  );
};

export default Patient;
