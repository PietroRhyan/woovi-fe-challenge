'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { PaymentLabel } from './payment-label'
import { formatCurrency } from '@/utils/format-currency'

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex flex-col items-center gap-[34px]'
            >
              <FormItem
                className="w-full max-w-[430px]"
              >
                <PaymentLabel label='Pix' />
                <FormControl >
                  <FormItem className="border-2 border-gray rounded-[10px] w-full p-5 flex justify-between hover:border-black transition-colors duration-200" >
                    <FormLabel className='absolute z-10 w-full h-full left-0 top-0 cursor-pointer' />
                    <div className="flex flex-col" >
                      <h3 className="text-2xl font-semibold">
                        <span className='font-extrabold'>1x</span> {formatCurrency(30500.00)}
                      </h3>
                      <p className="text-base font-semibold text-green" >
                        Ganhe <span className="font-extrabold">3%</span> de Cashback
                      </p>
                    </div>
                    <FormControl>
                      <RadioGroupItem value='one-parcel' />
                    </FormControl>
                  </FormItem>
                </FormControl>
              </FormItem>

              <FormItem
                className="w-full max-w-[430px]"
              >
                <PaymentLabel label='Pix Parcelado' />
                {parcels.map((value) => (
                  <FormControl key={value.id} >
                    <FormItem className="border-x-2 border-t-2 last:border-b-2 border-gray first:rounded-t-[10px] last:rounded-b-[10px] w-full p-5 flex justify-between hover:border-black transition-colors duration-200" >
                      <FormLabel className='absolute z-10 w-full h-full left-0 top-0 cursor-pointer' />
                      <div className="flex flex-col" >
                        <h3 className="text-2xl font-semibold">
                          <span className='font-extrabold'>{value.parcels}x</span> {formatCurrency(value.value / value.parcels)}
                        </h3>
                        <p className="text-base font-semibold text-graytext" >Total: {formatCurrency(value.value)}</p>
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
      </form>
    </Form>
  )
}