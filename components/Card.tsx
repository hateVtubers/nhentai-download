import { Doujin } from "nhentai";
import Image from "next/image";
import { RemoveButton } from "components/removeButton";

type Props = {
  doujin: Doujin[];
  handlerRemove: (index: number) => void;
};

export const Card = ({ doujin, handlerRemove }: Props) => {
  return (
    <>
      {doujin.map(({ titles, pages, url }, index) => (
        <div
          className="flex flex-col items-center gap-1 relative "
          key={titles.japanese}
        >
          <h1 className="md:text-lg font-semibold">
            {titles?.pretty ?? titles.english}
          </h1>
          <span className="text-xs">{url}</span>
          <Image
            src={pages[0].url}
            alt={titles.english}
            width={250}
            height={300}
            priority
          />
          <RemoveButton onClick={() => handlerRemove(index)} />
        </div>
      ))}
    </>
  );
};
