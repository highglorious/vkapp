import { GetGroupsResponse } from "../types/api";
import mockData from "./data.json";

const serverDelay = 1000;

export function getGroups(): Promise<GetGroupsResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        result: 1, // change to 0 to test correpted data
        data: mockData, // comment property for missing data
      });
    }, serverDelay);
  });
}

export const fetcher = () =>
  getGroups().then((r) => {
    if (r.result === 0) return Promise.reject(new Error("Data corrupted"));
    if (!r.data) return Promise.reject(new Error("Data not found"));
    return r.data;
  });
