import Image from "next/image";
import { Data } from "libs/doujin";

type Props = {
  data: Data[];
};

export const Card = ({ data }: Props) => {
  return (
    <>
      {data.map(({ title, id, images }) => (
        <div className="flex flex-col items-center gap-2 relative " key={id}>
          <h1 className="md:text-lg font-semibold">
            {title?.simple ?? title.english}
          </h1>
          <a
            href={`https://nhentai.net/g/${id}/`}
            target="_blank"
            className="text-xs">
            {id}
          </a>
          <Image
            src={images[0].url}
            alt={title.english}
            width={250}
            height={300}
            priority
          />
        </div>
      ))}
    </>
  );
};
