import useSWR from "swr";
import { fetcher } from "../api/fetch";

export function useGroups() {
  const { data, error, isLoading } = useSWR("  ", fetcher);

  return {
    groups: data,
    isLoading,
    isError: error,
  };
}
