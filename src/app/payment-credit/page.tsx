'use client'

import { PaymentInfo } from "@/components/payment-info";
import { CreditCardForm } from "@/components/credit-card-form";
import { formatCurrency } from "@/utils/format-currency";
import { parcels, ValueType } from "@/utils/payment-values";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function PaymentCredit() {
  const [data, setData] = useState<ValueType>()

  useEffect(() => {
    const paymentMethod = localStorage.getItem('payment-method')

    const data = parcels.filter((parcel) => {
      if (parcel.id === paymentMethod) {
        return parcel
      }
    })

    setData(data[0])
  }, [])

  if (data?.parcels === 1) {
    return (
      <main className="px-4 max-w-[430px] w-full mb-5 min-h-[500px] mx-auto flex flex-col items-center justify-center gap-1" >
        <h1 className="text-3xl font-extrabold" >Obrigado, João!</h1>
        <p className="font-semibold">Seu pagamento foi concluído!</p>

        <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green outline outline-2 outline-green outline-offset-2">
          <FaCheck size={16} className="text-white" />
        </div>
      </main>
    )
  }

  return (
    <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5" >
      <h2 className="text-center font-extrabold text-2xl" >João, pague o restante em 1x no cartão</h2>

      <CreditCardForm data={data}/>

      <PaymentInfo>
        <PaymentStatusInfo data={data} />
      </PaymentInfo>
    </main>
  )
}


type PaymentStatusInfoProps = {
  data?: ValueType
}

function PaymentStatusInfo({ data }: PaymentStatusInfoProps) {
  return (
    <>
      <div className="border-b-2 border-gray w-full flex py-5" >
        <div className="flex flex-col items-center justify-center gap-7 ml-2 mr-4 py-1.5">
          {data && data.parcels === 2 ? (
            <div role="separator" className="relative bottom-0 w-[2px] h-full bg-gray" >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green text-white w-4 h-4 rounded-full flex items-center justify-center">
                <FaCheck size={8} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full">
              </div>
            </div>
          ) : data && data.parcels > 2 ? (
            <div role="separator" className="relative bottom-0 w-[2px] h-full bg-gray" >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green text-white w-4 h-4 rounded-full flex items-center justify-center">
                <FaCheck size={8} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green w-4 h-4 rounded-full">
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full">
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-full flex flex-col items-center gap-4" >
          {data && data.parcels === 2 ? (
            <>
              <div className="w-full flex items-center justify-between" >
                <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
                <span className="text-[18px] font-extrabold" >{formatCurrency(data.value / data.parcels)}</span>
              </div>
              <div className="w-full flex items-center justify-between" >
                <p className="text-[18px] font-semibold">2ª no cartão</p>
                <span className="text-[18px] font-extrabold" >{formatCurrency(data.value / data.parcels)}</span>
              </div>
            </>
          ) : data && data.parcels > 2 ? (
            <>
              <div className="w-full flex items-center justify-between" >
                <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
                <span className="text-[18px] font-extrabold" >{formatCurrency(data.value / data.parcels)}</span>
              </div>
              <div className="w-full flex items-center justify-between" >
                <p className="text-[18px] font-semibold">2ª no cartão</p>
                <span className="text-[18px] font-extrabold" >{formatCurrency(data.value / data.parcels)}</span>
              </div>
              <div className="w-full flex items-center justify-between" >
                <p className="text-[18px] font-semibold">Próximos meses</p>
                <span className="text-[18px] font-extrabold" >{data.parcels - 2}x {formatCurrency(data.value / data.parcels)}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="border-b-2 border-gray w-full flex items-center justify-between py-5" >
        <p className="text-sm font-semibold" >CET: 0,5%</p>
        <span className="text-[18px] font-semibold" >
          Total: {data ? formatCurrency(data.value) : "R$ 0,00"}
        </span>
      </div>
    </>
  )
}