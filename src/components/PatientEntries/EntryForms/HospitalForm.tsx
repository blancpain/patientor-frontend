import { useState } from "react";
import { nanoid } from "nanoid";
import { Diagnose, Discharge } from "../../../types";

// diagnose selection
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

type Props = {
  createEntry: (arg: object) => void;
  diagnoses: Diagnose[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const HospitalForm = ({ createEntry, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [diagnose, setDiagnose] = React.useState<string[]>([]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const currentDischargeDate: string = dischargeDate;
    const currentDischargeCriteria: string = dischargeCriteria;

    const currentDischarge: Discharge = {
      date: currentDischargeDate,
      criteria: currentDischargeCriteria,
    };

    setDischarge({
      date: currentDischargeDate,
      criteria: currentDischargeCriteria,
    });

    const newEntry = {
      description: description,
      date: date,
      specialist: specialist,
      discharge: currentDischarge,
      type: "Hospital",
      diagnosisCodes: diagnose,
    };

    createEntry(newEntry);
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnose>) => {
    const {
      target: { value },
    } = event;
    setDiagnose(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div style={{ border: "1px dotted black", padding: "10px" }}>
      <h3>Hospital Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Description
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          Date
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Specialist
          <input
            type="text"
            name="specialist"
            id="specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          <div>Discharge</div>
          <span>Date: </span>
          <input
            type="date"
            name="dischargeDate"
            id="dischargeDate"
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <span>Criteria: </span>
          <input
            type="text"
            name="dischargeCriteria"
            id="dischargeCriteria"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label">Diagnose</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={diagnose}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {diagnoses.map((item) => (
                <MenuItem key={nanoid()} value={item.code}>
                  <Checkbox checked={diagnose.indexOf(item.code) > -1} />
                  <ListItemText primary={item.code} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default HospitalForm;
