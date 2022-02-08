import { Data } from "libs/doujin";
/* import { useEffect, useState } from "react"; */
import useSWRImmutable from "swr";
import { saveAs } from "file-saver";
import { Loader } from "components/Loader";
import JSZip from "jszip";

const fetcher = (...args: string[]) => {
  return Promise.all(args.map((v) => fetch(v).then((r) => r.json())));
};

type Props = {
  doujins: Data[];
  map: string;
};

export const Download = ({ doujins, map }: Props) => {
  const urlArray = doujins.map(
    ({ id }) =>
      `${process.env.NEXT_PUBLIC_SUPABASE_URL_DOWNLOAD}/storage/v1/object/public/base64/${id}.json`
  );
  const { data } = useSWRImmutable<string[][]>(urlArray, fetcher, {
    loadingTimeout: 6000, // why timeout? because database is slow
  });
  /*   const [data, setData] = useState<string[][] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const a = await fetcher(...urlArray);
        console.log(a);
        setData(a);
      }, 3000);
    };

    fetchData();
  }, []); */

  if (!data) return <Loader width={40} height={40} />;

  const handleDownload = () => {
    // please I need help, this code is very trash
    const Zip = new JSZip();

    data.forEach((url, index) => {
      const img = Zip.folder(
        doujins[index].title.simple ??
          doujins[index].title.english ??
          doujins[index].title.japanese ??
          doujins[index].id
      );
      url.forEach((v, i) => {
        img?.file(`${i + 1}.jpg`, v, { base64: true });
      });
    });

    Zip.generateAsync({ type: "blob" }).then((content) => {
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
