import { Data } from "libs/doujin";
import useSWRImmutable from "swr/immutable";
import { saveAs } from "file-saver";
import { Loader } from "components/Loader";
import JSZip from "jszip";

type Props = {
  doujins: Data[];
  map: string;
};

const fetcher = (...args: string[]) => {
  return Promise.all(args.map((v) => fetch(v).then((r) => r.json())));
};

export const Download = ({ doujins, map }: Props) => {
  const urlArray = doujins.map(
    ({ id }) =>
      `${process.env.NEXT_PUBLIC_SUPABASE_URL_DOWNLOAD}/storage/v1/object/public/base64/${id}.json`
  );
  const { data } = useSWRImmutable<string[][]>(urlArray, fetcher, {
    loadingTimeout: 5000, // why timeout? because database is slow
  });

  if (!data) return <Loader width={40} height={40} />;

  // please I need help, this code is very trash
  const Zip = new JSZip();
  data.forEach((url, index) => { // [[base64, base64, ...], [base64, base64, ...], ...]
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

  const handleDownload = async () => {
    await Zip.generateAsync({ type: "blob" }).then((content) => {
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
