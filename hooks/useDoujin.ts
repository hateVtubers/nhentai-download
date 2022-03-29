import { useLazyQuery } from '@apollo/client';
import { searchDoujin } from 'apollo/querys';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type Inputs = {
  doujin: string;
};

type Doujin = {
  nhentai: {
    info: {
      id: string;
      title: {
        english?: string;
        japanese?: string;
      };
    };
  };
};

export const useDoujin = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [doujins, setDoujins] = useState<string[]>([]);
  const [getDoujins] = useLazyQuery<Doujin>(searchDoujin);

  const onSubmit: SubmitHandler<Inputs> = ({ doujin }) => {
    toast.promise(getDoujins({ variables: { doujinID: doujin } }), {
      loading: 'Search doujin...',
      success: ({ data }) => {
        if (!data) throw new Error(); // data is null
        const success = `${
          data?.nhentai.info.title?.english ??
          data?.nhentai.info.title?.japanese
        } added`;

        setDoujins([...doujins, doujin]);

        return success;
      },
      error: `doujin ${doujin} not found!`,
    });
  };

  const handleRemove = (i: number) => {
    setDoujins(doujins.filter((_, index) => index !== i));
  };

  return {
    doujins,
    register,
    handleSubmit: useCallback(handleSubmit(onSubmit), [doujins]),
    handleRemove,
  };
};
