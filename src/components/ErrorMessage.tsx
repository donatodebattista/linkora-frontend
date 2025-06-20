type ErrorMessageProps = {
  children: React.ReactNode;
}


export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="text-red-500 uppercase font-bold text-sm bg-red-100 p-2 mt-2 rounded">{children}</p>
  )
}
