'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { formatCurrency } from '@/utils/format-currency'
import { useRouter } from 'next/navigation'
import { parcels } from '@/utils/payment-values'
import { Button } from '../button'
import { useLocale, useTranslations } from 'next-intl'

const formScheme = z.object({
  type: z.enum(
    [
      'one-parcel',
      'two-parcel',
      'three-parcel',
      'four-parcel',
      'five-parcel',
      'six-parcel',
      'seven-parcel',
    ],
    {
      required_error: 'Por favor selecione uma opção de pagamento.',
    },
  ),
})

type formSchemeType = z.infer<typeof formScheme>

export function PaymentMethods() {
  const router = useRouter()

  const t = useTranslations('payment-methods')
  const locale = useLocale()

  const form = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      type: 'one-parcel',
    },
  })

  const onSubmit: SubmitHandler<formSchemeType> = ({ type }) => {
    localStorage.setItem('payment-method', type)
    console.log('Método de pagamento: ', type)

    router.push(`/${locale}/payment-pix`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full mx-auto justify-center max-w-[430px] gap-5"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col items-center gap-[34px] w-full"
            >
              <FormItem className="w-full">
                <PaymentLabel label="Pix" />
                <FormControl>
                  <FormItem
                    className={`border-2 border-gray rounded-[10px] group/unchecked w-full p-5 flex justify-between ${field.value === 'one-parcel' ? 'border-green group/checked bg-lightgreen' : 'hover:bg-secondary-white'} transition-colors duration-200`}
                  >
                    <FormLabel className="absolute z-10 w-full h-full left-0 top-0 cursor-pointer" />
                    <div className="flex flex-col w-full gap-1">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          <span className="font-extrabold">
                            {parcels[0].parcels}x
                          </span>{' '}
                          {formatCurrency(parcels[0].value)}
                        </h3>
                        <p className="text-base font-semibold text-green">
                          {t('Cashback.pre-message')}{' '}
                          <span className="font-extrabold">
                            {t('Cashback.value')}
                          </span>{' '}
                          {t('Cashback.post-message')}
                        </p>
                      </div>

                      <BonusTag
                        radioId="one-parcel"
                        radioValueChecked={field.value}
                      >
                        <p className="text-white text-xs font-semibold xs:text-base truncate">
                          🤑{' '}
                          <span className="font-extrabold">
                            {formatCurrency(parcels[0].value * (3 / 100))}
                          </span>{' '}
                          {t('BonusTag.cashback-message')}
                        </p>
                      </BonusTag>
                    </div>
                    <FormControl>
                      <RadioGroupItem value="one-parcel" />
                    </FormControl>
                  </FormItem>
                </FormControl>
              </FormItem>

              <FormItem className="w-full">
                <PaymentLabel label={t('pix-installments')} />
                {parcels.map((value) => {
                  if (value.parcels > 1) {
                    return (
                      <FormControl key={value.id}>
                        <FormItem
                          className={`border-x-2 border-t-2 last:border-b-2 border-gray group/unchecked [&:nth-child(2)]:rounded-t-[10px] last:rounded-b-[10px] ${field.value === value.id ? 'border-2 group-checked border-green bg-lightgreen' : 'hover:bg-secondary-white'} w-full p-5 flex justify-between transition-all duration-200`}
                        >
                          <FormLabel className="absolute z-10 w-full h-full left-0 top-0 cursor-pointer" />
                          <div className="flex flex-col w-full gap-1">
                            <div>
                              <h3 className="text-2xl font-semibold">
                                <span className="font-extrabold">
                                  {value.parcels}x
                                </span>{' '}
                                {formatCurrency(value.value / value.parcels)}
                              </h3>
                              <p className="text-base font-semibold text-graytext">
                                Total: {formatCurrency(value.value)}
                              </p>
                            </div>

                            {value.parcels === 4 ? (
                              <BonusTag
                                radioId={value.id}
                                radioValueChecked={field.value}
                              >
                                <p className="text-white text-xs xs:text-base font-semibold truncate">
                                  <span className="font-extrabold">
                                    {t('BonusTag.fee')}
                                  </span>{' '}
                                  {t('BonusTag.fee-message')}
                                </p>
                              </BonusTag>
                            ) : null}
                          </div>
                          <FormControl>
                            <RadioGroupItem value={value.id} />
                          </FormControl>
                        </FormItem>
                      </FormControl>
                    )
                  }
                  return null
                })}
              </FormItem>
            </RadioGroup>
          )}
        ></FormField>

        <Button name={t('submit-button')} />
      </form>
    </Form>
  )
}

function PaymentLabel({ label }: { label: string }) {
  return (
    <span className="absolute text-[18px] top-0 left-[21px] -translate-y-1/2 flex items-center justify-center font-extrabold h-[27px] px-[18px] bg-gray rounded-[100px] z-20">
      {label}
    </span>
  )
}

type BonusTagProps = {
  children: React.ReactNode
  radioId:
    | 'one-parcel'
    | 'two-parcel'
    | 'three-parcel'
    | 'four-parcel'
    | 'five-parcel'
    | 'six-parcel'
    | 'seven-parcel'
  radioValueChecked?:
    | 'one-parcel'
    | 'two-parcel'
    | 'three-parcel'
    | 'four-parcel'
    | 'five-parcel'
    | 'six-parcel'
    | 'seven-parcel'
}

function BonusTag({ children, radioId, radioValueChecked }: BonusTagProps) {
  return (
    <div className="relative overflow-hidden flex items-center w-full h-[34px] px-[10px] bg-blue rounded-l-[4px] rounded-r-[4px]">
      <div
        className={`w-[24px] h-[24px] group-hover/unchecked:bg-secondary-white ${radioValueChecked === radioId ? 'bg-lightgreen' : 'bg-white'} rounded-bl-sm rotate-45 absolute -right-[2px] top-[5px] translate-x-1/2 transition-colors duration-200`}
      ></div>
      {children}
    </div>
  )
}
