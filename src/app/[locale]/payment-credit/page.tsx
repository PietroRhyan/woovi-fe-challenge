'use client'

import { PaymentInfo } from '@/components/payment-info'
import { CreditCardForm } from '@/components/credit-card-form'
import { formatCurrency } from '@/utils/format-currency'
import { parcels, ValueType } from '@/utils/payment-values'
import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { useTranslations } from 'next-intl'

export default function PaymentCredit() {
  const [data, setData] = useState<ValueType>()
  const t = useTranslations('payment-credit')

  useEffect(() => {
    const paymentMethod = localStorage.getItem('payment-method')
    if (paymentMethod) {
      const data = parcels.filter((parcel) => parcel.id === paymentMethod)
      setData(data[0])
    }
  }, [])

  if (!data) {
    return (
      <main className="px-4 w-full flex-grow mx-auto flex flex-col items-center justify-center">
        <ImSpinner2 size={32} className="animate-spin" />
      </main>
    )
  }

  if (data.parcels === 1) {
    return (
      <main className="px-4 max-w-[430px] w-full flex-grow mx-auto flex flex-col items-center justify-center gap-1">
        <h1 className="text-3xl font-extrabold">
          {t('PaymentConfirmed.title')}
        </h1>
        <p className="font-semibold">{t('PaymentConfirmed.description')}</p>

        <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green outline outline-2 outline-green outline-offset-2">
          <FaCheck size={16} className="text-white" />
        </div>
      </main>
    )
  }

  if (data.parcels > 1) {
    return (
      <main className="px-4 max-w-[430px] w-full mb-5 mx-auto space-y-5">
        <h2 className="text-center font-extrabold text-2xl">
          {t('PaymentForm.title')}
        </h2>

        <CreditCardForm data={data} />

        <PaymentInfo>
          <PaymentStatusInfo data={data} />
        </PaymentInfo>
      </main>
    )
  }
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
          {data && data.parcels === 2 ? (
            <div
              role="separator"
              className="relative bottom-0 w-[2px] h-full bg-gray"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green text-white w-4 h-4 rounded-full flex items-center justify-center">
                <FaCheck size={8} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-green w-4 h-4 rounded-full"></div>
            </div>
          ) : data && data.parcels > 2 ? (
            <div
              role="separator"
              className="relative bottom-0 w-[2px] h-full bg-gray"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green text-white w-4 h-4 rounded-full flex items-center justify-center">
                <FaCheck size={8} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green w-4 h-4 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border-2 border-gray w-4 h-4 rounded-full"></div>
            </div>
          ) : null}
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          {data && data.parcels === 2 ? (
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
