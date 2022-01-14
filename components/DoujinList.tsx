import { RemoveButton } from "./removeButton";
import { Tag } from "components/Tag";

type Props = {
  doujins: string[];
  handlerRemove: (index: number) => void;
};

export const DoujinList = ({ doujins, handlerRemove }: Props) => {
  return (
    <>
      <ul className="flex items-center gap-3 flex-wrap transition">
        {doujins.map((doujin, index) => (
          <Tag key={index} className="relative py-1 px-4 sm:px-3 gap-2 font-bold">
            <>
              <RemoveButton onClick={() => handlerRemove(index)} />
              <p>{`${doujin}`}</p>
            </>
          </Tag>
        ))}
      </ul>
    </>
  );
};
