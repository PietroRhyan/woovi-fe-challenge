export function PaymentLabel({label}: {label: string}) {
  return (
    <span className='absolute text-[18px] top-0 left-[21px] -translate-y-1/2 flex items-center justify-center font-extrabold h-[27px] px-[18px] bg-gray rounded-[100px] z-20'>{label}</span>
  )
} 