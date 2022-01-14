import { API, Doujin } from "nhentai";
import JSZip from "jszip";
import file from "file-saver";

export type DoujinRes = (Doujin | { doujin: string })[];

export const getDoujin = async (codes: string[]): Promise<DoujinRes> => {
  const Api = new API();

  const doujinRes = (await Promise.all(
    codes.map(async (code) => {
      return (await Api.doujinExists(code))
        ? await Api.fetchDoujin(code)
        : { doujin: "not existing" };
    })
  )) as DoujinRes;

  return doujinRes;
  /*   const zip = new JSZip();
  const img = zip.folder("images");

  img?.file("a.jpg", "a", { base64: true });
  img?.file("w.jpg", "a", { base64: true });

  zip.generateAsync({ type: "blob" }).then((content) => {
    file.saveAs(content, "testing.zip");
  }); */
};

export const handleDownload = (
  doujins: Doujin[],
  base64: string[][],
  url: string
) => {
  const Zip = new JSZip();

  doujins.forEach(({ pages, titles: { pretty, english } }, betterIndex) => {
    const img = Zip.folder(`${pretty ?? english}`);
    pages.forEach(({ extension, pageNumber }, subIndex) => {
      img?.file(`${pageNumber}.${extension}`, base64[betterIndex][subIndex], {
        base64: true,
      });
    });
  });

  Zip.generateAsync({ type: "blob" }).then((content) => {
    file.saveAs(content, `${url.replaceAll("/", "-")}.zip`);
  });
};
