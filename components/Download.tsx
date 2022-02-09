import { Data } from "libs/doujin";
import { useRef } from "react";
import useSWRImmutable from "swr/immutable";
import { saveAs } from "file-saver";
import { Loader } from "components/Loader";
import JSZip from "jszip";

type Props = {
  doujins: Data[];
  map: string;
  urlArray: string[];
};

const fetcher = (...args: string[]) => {
  return Promise.all(args.map((v) => fetch(v).then((r) => r.json())));
};

export const Download = ({ doujins, map, urlArray }: Props) => {
  const Zip = useRef(new JSZip());
  const { data } = useSWRImmutable<string[][]>(urlArray, fetcher, {
    loadingTimeout: 5000, // why timeout? because database is slow
    // please I need help, this code is very trash
    onSuccess: (dataOnSuccess) => {
      dataOnSuccess.forEach((urls, index) => {
        const img = Zip.current.folder(
          doujins[index].title.simple ??
            doujins[index].title.english ??
            doujins[index].title.japanese ??
            doujins[index].id
        );
        urls.forEach((v, i) => {
          img?.file(`${++i}.jpg`, v, { base64: true });
        });
      });
    },
  });

  if (!data) return <Loader width={40} height={40} />;

  const handleDownload = async () => {
    await Zip.current.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `[${map}].zip`);
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-cod-gray-500 py-1 px-3 rounded"
    >
      Download zip
    </button>
  );
};
