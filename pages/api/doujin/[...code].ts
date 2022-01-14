import type { NextApiRequest, NextApiResponse } from "next";
import { getDoujin } from "lib/doujin";
import { Doujin } from "nhentai";
import imageToBase64 from "image-to-base64";

const doujinBase64 = async (
  req: NextApiRequest,
  res: NextApiResponse<string[][]>
) => {
  const query = req.query.code as string[];
  const doujins = (await getDoujin(query)) as Doujin[];
  const urls = doujins.map(({ pages }) => pages.map(({ url }) => url));

  const base64 = await Promise.all(
    urls.map((urls) => Promise.all(urls.map((url) => imageToBase64(url))))
  );

  res.status(200).json(base64);
};

export default doujinBase64;
