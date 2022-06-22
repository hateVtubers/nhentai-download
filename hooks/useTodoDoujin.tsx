import { useLazyQuery } from '@apollo/client'
import { searchDoujin } from 'apollo/querys'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export type Inputs = {
  doujin: number
}

type Doujin = {
  nhentai: {
    info: {
      id: string
      title: {
        english?: string
        japanese?: string
      }
    }
  }
}

type Props = {
  doujins: (string | number)[]
  handleRemove: (i: number) => void
  handleSubmit: () => Promise<void>
}

const getSuccess = ({ data }: { data: Doujin | undefined }) => {
  if (!data) throw Error() // when doujin not found -> undefined
  const {
    nhentai: {
      info: { title },
    },
  } = data ?? {}

  const success = `${title.english ?? title.japanese} added`

  return {
    success,
  }
}

// @ts-ignore
export const TodoDoujin = createContext<Props>()

export const TodoDoujinProvider = ({ children }: { children: ReactNode }) => {
  const [getDoujins] = useLazyQuery<Doujin>(searchDoujin)
  const { pathname } = useRouter()
  const { handleSubmit: onSubmit } = useFormContext<Inputs>()
  const [doujins, setDoujins] = useState<(string | number)[]>(
    pathname.split('/').filter(
      (r) => r // array from routes
    )
  )

  const handleSearch: SubmitHandler<Inputs> = async ({ doujin: doujinID }) => {
    toast.promise(getDoujins({ variables: { doujinID } }), {
      loading: 'Search doujin...',
      success: ({ data }) => {
        const { success } = getSuccess({ data })
        setDoujins([...doujins, doujinID])

        return success
      },
      error: () => {
        const error = `doujin ${doujinID} not found!`
        console.error(error)

        return error
      },
    })
  }

  const handleRemove = (i: number) => {
    setDoujins(doujins.filter((_, index) => index !== i))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(onSubmit(handleSearch), [doujins])

  return (
    <TodoDoujin.Provider value={{ doujins, handleRemove, handleSubmit }}>
      {children}
    </TodoDoujin.Provider>
  )
}

export const useTodoDoujin = () => ({ ...useContext(TodoDoujin) })
