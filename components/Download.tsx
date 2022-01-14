import useSWR from "swr";
import { Loader } from "./Loader";
import { handleDownload } from "lib/doujin";

const fetcher = (args: string) => fetch(args).then((res) => res.json());

export const Download = ({ url, doujin }: { url: string; doujin: any }) => {
  const { data } = useSWR(`/api/doujin/${url}`, fetcher);

  return (
    <>
      {!data && <Loader width={40} height={40} />}
      {data && (
        <button
          className="bg-cod-gray-500 py-1 px-3 rounded"
          onClick={() => handleDownload(doujin, data, url)}
        >
          Download zip
        </button>
      )}
    </>
  );
};
