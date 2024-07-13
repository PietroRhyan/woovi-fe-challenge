import Image from "next/image"


import { FaCheck } from "react-icons/fa";
import { PaymentInfo } from "@/components/payment-info";
import { CreditCardForm } from "@/components/credit-card-form";

export default function PaymentCredit() {
  // const [data, setData] = useState<ValueType[]>([])

  // useEffect(() => {
  //   const paymentMethod = localStorage.getItem('payment-method')

  //   const data = parcels.filter((parcel) => {
  //     if (parcel.id === paymentMethod) {
  //       return parcel
  //     }
  //   })

  //   setData(data)
  // }, [])

  return (
    <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5" >
      <h2 className="text-center font-extrabold text-2xl" >João, pague o restante em 1x no cartão</h2>

      <CreditCardForm />

      <PaymentInfo>
        <PaymentStatusInfo />
      </PaymentInfo>
    </main>
  )
}

function PaymentStatusInfo() {
  return (
    <div role="separator" className="relative bottom-0 w-[2px] h-full bg-gray" >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green text-white w-4 h-4 rounded-full flex items-center justify-center">
        <FaCheck size={8} />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full">
      </div>
    </div>
  )
}