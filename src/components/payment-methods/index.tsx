'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { formatCurrency } from '@/utils/format-currency'
import { useState } from 'react'

const formScheme = z.object({
  type: z.enum(["one-parcel", "two-parcel", "three-parcel", "four-parcel", "five-parcel", "six-parcel", "seven-parcel"], {
    required_error: "Por favor selecione uma opção de pagamento.",
  })
})

type formSchemeType = z.infer<typeof formScheme>

type ValueType = {
  id: string
  parcels: number
  value: number
}

const parcels: ValueType[] = [
  {
    id: 'two-parcel',
    parcels: 2,
    value: 30600.00
  },
  {
    id: 'three-parcel',
    parcels: 3,
    value: 30620.00
  },
  {
    id: 'four-parcel',
    parcels: 4,
    value: 30900.00
  },
  {
    id: 'five-parcel',
    parcels: 5,
    value: 31500.00
  },
  {
    id: 'six-parcel',
    parcels: 6,
    value: 31699.98
  },
  {
    id: 'seven-parcel',
    parcels: 7,
    value: 31800.00
  },
]

export function PaymentMethods() {
  const [radioCheckedValue, setRadioCheckedValue] = useState('one-parcel')

  const form = useForm<formSchemeType>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      type: 'one-parcel',
    }
  })

  const onSubmit: SubmitHandler<formSchemeType> = ({ type }) => {
    localStorage.setItem("payment-method", type)
    console.log("Método de pagamento: ", type)
  }

  console.log(radioCheckedValue)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mx-auto justify-center max-w-[430px] gap-5" >
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex flex-col items-center gap-[34px] w-full'
            >
              <FormItem
                className="w-full"
              >
                <PaymentLabel label='Pix' />
                <FormControl >
                  <FormItem className={`border-2 border-gray rounded-[10px] w-full p-5 flex justify-between ${field.value === "one-parcel" ? "border-green bg-green/10 " : "hover:bg-black/5"} transition-colors duration-200`} >
                    <FormLabel className='absolute z-10 w-full h-full left-0 top-0 cursor-pointer' />
                    <div className="flex flex-col w-full gap-1" >
                      <div>
                        <h3 className="text-2xl font-semibold">
                          <span className='font-extrabold'>1x</span> {formatCurrency(30500.00)}
                        </h3>
                        <p className="text-base font-semibold text-green" >
                          Ganhe <span className="font-extrabold">3%</span> de Cashback
                        </p>
                      </div>

                      <BonusLabel>
                        <p className="text-white text-base font-semibold" >
                        🤑 <span className="font-extrabold">{formatCurrency(30500.00 * (3 / 100))}</span> de volta no seu Pix na hora
                        </p>
                      </BonusLabel>
                    </div>
                    <FormControl >
                      <RadioGroupItem value='one-parcel' />
                    </FormControl>
                  </FormItem>
                </FormControl>
              </FormItem>

              <FormItem
                className="w-full"
              >
                <PaymentLabel label='Pix Parcelado' />
                {parcels.map((value) => (
                  <FormControl key={value.id} >
                    <FormItem className={`border-x-2 border-t-2 last:border-b-2 border-gray [&:nth-child(2)]:rounded-t-[10px] last:rounded-b-[10px] ${field.value === value.id ? "border border-green bg-green/10 " : "hover:bg-black/5"} w-full p-5 flex justify-between transition-all duration-200`} >
                      <FormLabel className='absolute z-10 w-full h-full left-0 top-0 cursor-pointer' />
                      <div className="flex flex-col w-full gap-1">
                        <div>
                          <h3 className="text-2xl font-semibold">
                            <span className='font-extrabold'>{value.parcels}x</span> {formatCurrency(value.value / value.parcels)}
                          </h3>
                          <p className="text-base font-semibold text-graytext" >Total: {formatCurrency(value.value)}</p>
                        </div>

                        {value.parcels === 4 ? (
                          <BonusLabel>
                            <p className="text-white text-base font-semibold" >
                              <span className="font-extrabold" >-3% de juros:</span> Melhor opção de parcelamento
                            </p>
                        </BonusLabel>
                        ) : null}
                      </div>
                      <FormControl>
                        <RadioGroupItem value={value.id} />
                      </FormControl>
                    </FormItem>
                  </FormControl>
                ))}
              </FormItem>
            </RadioGroup>
          )}
        >
        </FormField>

        <button type='submit' className="text-base font-extrabold text-black bg-green rounded-md py-2 max-w-[430px] hover:brightness-95 transition-all duration-200" >
          Realizar pagamento
        </button>
      </form>
    </Form>
  )
}

function PaymentLabel({label}: {label: string}) {
  return (
    <span className='absolute text-[18px] top-0 left-[21px] -translate-y-1/2 flex items-center justify-center font-extrabold h-[27px] px-[18px] bg-gray rounded-[100px] z-20'>{label}</span>
  )
} 

function BonusLabel({children}: {children: React.ReactNode}) {
  return (
    <div className="relative flex items-center w-full h-[34px] px-[10px] bg-blue rounded-l-sm rounded-r-[4px]" >
      <div className="w-[24px] h-[24px] bg-white rounded-bl-sm rotate-45 absolute right-0 top-[5px] translate-x-1/2"></div>
      {children}
    </div>
  )
}