import { CircularProgress } from '@mui/material';

export default function LoadingSpinner({ label, extraClasses, color = `success` }: any) {
  return (
    <div className={`loading ${extraClasses}`}>
      <CircularProgress color={color} />
      <div className={`loadingLabel`}>
        Loading {label}...
      </div>
    </div>
  )
}