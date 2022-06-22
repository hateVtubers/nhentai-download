import { useTodoDoujin } from 'hooks/useTodoDoujin'
import { RemoveButton } from 'components/RemoveButton'

export const DoujinList = () => {
  const { doujins, handleRemove } = useTodoDoujin()

  return (
    <>
      <ul className='flex items-center gap-3 flex-wrap transition'>
        {doujins.map((doujin, index) => (
          <li
            key={index}
            className='bg-cod-gray-500 rounded shadow-sm shadow-amaranth-500 hover:shadow-amaranth-400 relative py-1 px-4 sm:px-3 gap-2 font-bold'
          >
            <RemoveButton onClick={() => handleRemove(index)} />
            <p>{`${doujin}`}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
