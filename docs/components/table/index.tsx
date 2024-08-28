import styles from './style.module.css'



export function OptionTable({headers, options }: {headers:[string,string,string],  options: [string, string, any] }) {
  return (
    <div
      className={
        'mb-4 mt-6 overflow-x-auto overscroll-x-contain pb-4 border border-gray-200 rounded-lg dark:border-neutral-700 ' +
        styles.container
      }
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
          <th className="px-6 py-2 font-semibold">{headers[0]}</th>
            <th className="py-2 pl-6 font-semibold">{headers[1]}</th>
            <th className="px-6 py-2 font-semibold">{headers[2]}</th>
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map(([option, type, description]) => (
            <tr
              key={option}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              <td className="px-6 whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-blue-600 dark:text-blue-500">
                {option}
              </td>
              <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                {type}
              </td>
              <td className="py-2 pl-6">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TwoColumnTable({ headers, data }: { headers: string[], data: string[][] }) {
  return (
    <div className="mb-4 mt-6 overflow-x-auto overscroll-x-contain pb-4 border border-gray-200 rounded-lg dark:border-neutral-700 ">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-2 font-semibold">{header}</th>))}
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`py-2 ${cellIndex === 0 ? 'px-6' : 'pl-6'} ${cellIndex === 0 ? 'font-mono text-xs font-semibold leading-6 text-blue-600 dark:text-blue-500' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}