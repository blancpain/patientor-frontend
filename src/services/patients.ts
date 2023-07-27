import axios from "axios";
import { Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (input: object, id: string) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      input
    );
    return data;
  } catch (e) {
    let errorMessage: string = "";
    if (
      axios.isAxiosError(e) &&
      e.response &&
      typeof e.response.data === "string"
    ) {
      errorMessage += e.response.data;
      return errorMessage;
    } else {
      errorMessage = "Something went wrong. Please try again.";
      return errorMessage;
    }
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  createEntry,
};
