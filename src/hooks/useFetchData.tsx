import { useState, useEffect } from "react";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface FetchDataResponse<Data> {
	data: Data | null;
	error: string | null;
	status: FetchStatus;
}

export function useFetchData<Data>(url: string): FetchDataResponse<Data> {
	const [data, setData] = useState<Data | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [status, setStatus] = useState<FetchStatus>("idle");

	useEffect(() => {
		setStatus("loading");
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Request failed with status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setStatus("success");
			})
			.catch((error) => {
				setError(error.message);
				setStatus("error");
			});
	}, [url]);

	return {
		data,
		error,
		status,
	};
}

