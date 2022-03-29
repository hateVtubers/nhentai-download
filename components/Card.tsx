import Image from 'next/image';
import { Data } from 'libs/doujin';

type Props = {
  doujins: Data[];
};

export const Card = ({ doujins }: Props) => {
  return (
    <>
      <ul className='flex md:flex-wrap flex-col md:flex-row items-center'>
        {doujins.map(({ title, id, images, url }) => (
          <li
            className='flex flex-col items-center justify-center gap-2 max-w-[300px]'
            key={id}
          >
            <h1 className='md:text-lg font-semibold text-center'>
              {title?.english ?? title?.japanese}
            </h1>
            <a href={url} target='_blank' rel='noreferrer' className='text-xs'>
              {id}
            </a>
            <Image
              src={images.at(0)?.url as string}
              alt={title?.english ?? title?.japanese}
              width={250}
              height={350}
              className='mx-auto rounded-sm'
              priority
            />
          </li>
        ))}
      </ul>
    </>
  );
};
