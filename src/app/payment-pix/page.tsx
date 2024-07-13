"use client"

import Image from "next/image"

import qr from "/public/assets/qr-code.png"
import { Button } from "@/components/button"
import { FaCopy, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PaymentInfo } from "@/components/payment-info";

export default function PaymentPix() {
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

  const router = useRouter()

  return (
    <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5" >
      <h2 className="text-center font-extrabold text-2xl" >João, pague a entrada de R$ 15.300,00 pelo Pix</h2>

      <div className="w-[350px] h-[350px] mx-auto aspect-square p-2 border-2 border-green rounded-[10px]" >
        <div className="w-hull h-full relative aspect-square">
          <Image src={qr} alt="Fake QR Code" fill priority quality={100} />
        </div>
      </div>

      <div className="mx-auto w-[310px]" >
        <Button
          name="Clique para copiar QR Code"
          icon={<FaCopy size={20} />}
          onClick={() => router.push('/payment-credit')}
        />
      </div>

      <PaymentInfo>
        <PaymentStatusInfo />
      </PaymentInfo>
    </main>
  )
}

function PaymentStatusInfo() {
  return (
    <div role="separator" className="relative bottom-0 w-[2px] h-full bg-gray" >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full" >
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full">
      </div>
    </div>
  )
}