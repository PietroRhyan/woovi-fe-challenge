'use client'
/* eslint-disable import/no-absolute-path */

import Image from 'next/image'

import qr from '/public/assets/qr-code.png'
import { Button } from '@/components/button'
import { FaCopy } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { PaymentInfo } from '@/components/payment-info'
import { parcels, ValueType } from '@/utils/payment-values'
import { useState, useEffect } from 'react'
import { formatCurrency } from '@/utils/format-currency'
import { useLocale, useTranslations } from 'next-intl'

export default function PaymentPix() {
  const router = useRouter()
  const [data, setData] = useState<ValueType>()

  const t = useTranslations('payment-pix')
  const locale = useLocale()

  console.log(locale)

  useEffect(() => {
    const paymentMethod = localStorage.getItem('payment-method')
    if (paymentMethod) {
      const data = parcels.filter((parcel) => parcel.id === paymentMethod)
      setData(data[0])
    }
  }, [])

  return (
    <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5">
      <h2 className="text-center font-extrabold text-2xl">
        {t('Title.pre-title')}{' '}
        {data ? formatCurrency(data.value / data.parcels) : 'R$ 0,00'}{' '}
        {t('Title.post-title')}
      </h2>

      <div className="w-[350px] h-[350px] mx-auto aspect-square p-2 border-2 border-green rounded-[10px]">
        <div className="w-hull h-full relative aspect-square">
          <Image src={qr} alt="Fake QR Code" fill priority quality={100} />
        </div>
      </div>

      <div className="mx-auto w-[310px]">
        <Button
          name={t('copy-to-clipboard')}
          icon={<FaCopy size={20} />}
          onClick={() => router.push(`/${locale}/payment-credit`)}
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
  const t = useTranslations('payment-pix')
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
              <p className="text-[18px] font-semibold">
                {t('PaymentStatus.entry')}
              </p>
              <span className="text-[18px] font-extrabold">
                {formatCurrency(data.value / data.parcels)}
              </span>
            </div>
          ) : data && data.parcels === 2 ? (
            <>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">
                  {t('PaymentStatus.entry')}
                </p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">
                  {t('PaymentStatus.second')}
                </p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
            </>
          ) : data && data.parcels > 2 ? (
            <>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">
                  {t('PaymentStatus.entry')}
                </p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">
                  {t('PaymentStatus.second')}
                </p>
                <span className="text-[18px] font-extrabold">
                  {formatCurrency(data.value / data.parcels)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[18px] font-semibold">
                  {t('PaymentStatus.rest')}
                </p>
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
        <p className="text-sm font-semibold">{t('tec')}: 0,5%</p>
        <span className="text-[18px] font-semibold">
          Total: {data ? formatCurrency(data.value) : 'R$ 0,00'}
        </span>
      </div>
    </>
  )
}
