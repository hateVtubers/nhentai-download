import { Data } from "libs/doujin";
import useSWR from "swr";
import { saveAs } from "file-saver";
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
      `https://bxgpgpgunsannvfchsyn.supabase.in/storage/v1/object/public/base64/${id}.json`
  );
  const { data, error } = useSWR<string[][]>(urlArray, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleDownload = () => {
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
      saveAs(content, `${map}.zip`);
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-cod-gray-500 py-1 px-3 rounded">
      Download zip
    </button>
  );
};
