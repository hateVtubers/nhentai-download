import { gql } from "@apollo/client";
import client from "apollo/client";
import { supabase } from "db/supabase";
import imageToBase64 from "image-to-base64";

export type Data = {
  title: {
    english?: string;
    simple?: string;
    japanese?: string;
  };
  images: {
    original_url: string;
    url: string;
  }[];
  id: string;
};

const getDoujinNanExistInDB = async (codes: string[]) => {
  const { data } = await supabase.storage
    .from("base64")
    .list()
    .then(({ data }) => ({
      data: data?.map(({ name }) => name.replace(".json", "")), // remove .json from name
    }));

  const filter = codes.filter((code) => !data?.includes(code)); // filter codes that are not in the database

  return { filter };
};

export const getDoujinData = async (id: string[]) => {
  const datas: Data[] = await Promise.all(
    id.map((code) =>
      client
        .query({
          query: gql`
            query Countries {
              nhentai {
                info(doujin_id: ${code}) {
                  title {
                    english
                    simple
                    japanese
                  }
                  images {
                    url
                  }
                  id
                }
              }
            }
        `,
        })
        .then(({ data }) => data.nhentai.info)
    )
  );

  return datas;
};

export const updateDoujinData = async (codes: string[]) => {
  const { filter } = await getDoujinNanExistInDB(codes);

  if (!filter.length) return null; // if there is no doujin that is not in the database, return

  const doujins = await getDoujinData(filter);

  return await Promise.all(
    doujins.map(async ({ images, id }) => {
      const base64 = await Promise.all(
        images.map(async ({ url }) => await imageToBase64(url))
      );

      const { data, error } = await supabase.storage
        .from("base64")
        .upload(`${id}.json`, JSON.stringify(base64));

      return { data, error }; // please only working in developer mode for view the error or data
    })
  );
};
