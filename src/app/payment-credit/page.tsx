import Image from "next/image"

import qr from "/public/assets/qr-code.png"
import { Button } from "@/components/button"
import { FaCopy, FaChevronUp } from "react-icons/fa";
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

      <PaymentInfo />
    </main>
  )
}