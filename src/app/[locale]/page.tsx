import { PaymentMethods } from '@/components/payment-methods'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('payment-methods')

  return (
    <main className="px-4 w-full mb-5 space-y-8">
      <h2 className="text-center font-extrabold text-2xl">{t('title')}</h2>

      <PaymentMethods />
    </main>
  )
}
