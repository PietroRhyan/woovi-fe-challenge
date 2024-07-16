'use client'
/* eslint-disable import/no-absolute-path */

import Image from 'next/image'

import qr from '/public/assets/qr-code.png'
import { Button } from '@/components/button'
import { FaCopy } from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation'
import { PaymentInfo } from '@/components/payment-info'
import { parcels, ValueType } from '@/utils/payment-values'
import { useState, useEffect } from 'react'
import { formatCurrency } from '@/utils/format-currency'

export default function PaymentPix() {
  const router = useRouter()
  const pathname = usePathname()
  const [data, setData] = useState<ValueType>()

  useEffect(() => {
    const paymentMethod = localStorage.getItem('payment-method')

    const data = parcels.filter((parcel) => {
      if (parcel.id === paymentMethod) {
        return parcel
      }

      return []
    })

    setData(data[0])
  }, [])

  return (
    <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5">
      <h2 className="text-center font-extrabold text-2xl">
        João, pague a entrada de{' '}
        {data ? formatCurrency(data.value / data.parcels) : 'R$ 0,00'} pelo Pix
      </h2>

      <div className="w-[350px] h-[350px] mx-auto aspect-square p-2 border-2 border-green rounded-[10px]">
        <div className="w-hull h-full relative aspect-square">
          <Image src={qr} alt="Fake QR Code" fill priority quality={100} />
        </div>
      </div>

      <div className="mx-auto w-[310px]">
        <Button
          name="Clique para copiar QR Code"
          icon={<FaCopy size={20} />}
          onClick={() => router.push(pathname + '/payment-credit')}
        />
      </div>

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
      <div className="border-b-2 border-gray w-full flex py-5">
        <div className="flex flex-col items-center justify-center gap-7 ml-2 mr-4 py-1.5">
          {data && data.parcels === 1 ? (
            <div className="h-full">
              <div className="bg-white border-2 border-green w-4 h-4 rounded-full"></div>
            </div>
          ) : data && data.parcels === 2 ? (
            <div
              role="separator"
              className="relative bottom-0 w-[2px] h-full bg-gray"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full"></div>
            </div>
          ) : data && data.parcels > 2 ? (
            <div
              role="separator"
              className="relative bottom-0 w-[2px] h-full bg-gray"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full"></div>
            </div>
          ) : null}
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          {data && data.parcels === 1 ? (
            <div className="w-full flex items-center justify-between">
              <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
              <span className="text-[18px] font-extrabold">
                {formatCurrency(data.value / data.parcels)}
              </span>
            </div>
          ) : data && data.parcels === 2 ? (
            <>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">2ª no cartão</p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
            </>
          ) : data && data.parcels > 2 ? (
            <>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">1ª entrada no Pix</p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">2ª no cartão</p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">Próximos meses</p>
                <span className="text-[18px] font-extrabold">
                  {data.parcels - 2}x{' '}
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="border-b-2 border-gray w-full flex items-center justify-between py-5">
        <p className="text-sm font-semibold">CET: 0,5%</p>
        <span className="text-[18px] font-semibold">
          Total: {data ? formatCurrency(data.value) : 'R$ 0,00'}
        </span>
      </div>
    </>
  )
}
