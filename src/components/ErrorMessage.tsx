type ErrorMessageProps = {
  children: React.ReactNode;
}


export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <p className="text-red-400 text-xs font-medium mt-1.5">{children}</p>
  )
}
