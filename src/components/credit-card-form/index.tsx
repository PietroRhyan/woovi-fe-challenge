'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '../button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Form, FormField, FormItem, FormControl } from '../ui/form'
import { parcels, ValueType } from '@/utils/payment-values'
import { formatCurrency } from '@/utils/format-currency'
import { cpfMask, creditCardMask, validateMask } from '@/utils/input-masks'
import { useEffect } from 'react'
import { validateDate } from '@/utils/validate-date'
import { useTranslations } from 'next-intl'

type CreditCardFormProps = {
  data?: ValueType
}

export function CreditCardForm({ data }: CreditCardFormProps) {
  const t = useTranslations('payment-credit.PaymentForm')

  const formSchema = z
    .object({
      name: z
        .string()
        .min(2, t('NameInput.Errors.min'))
        .max(255, t('NameInput.Errors.max'))
        .regex(/^^[a-zA-ZÀ-ÿ\s]+$/, t('NameInput.Errors.letters')),
      cpf: z
        .string()
        .min(14, t('CPFInput.Errors.invalid'))
        .max(14, t('CPFInput.Errors.invalid')),
      creditCard: z
        .string()
        .min(19, t('CreditCardInput.Errors.invalid'))
        .max(19, t('CreditCardInput.Errors.invalid')),
      validate: z.string({
        required_error: t('ValidateInput.Errors.invalid'),
      }),
      cvv: z.coerce.number().positive(t('CVVInput.Errors.invalid')),
      parcelValue: z
        .string({
          required_error: t('InstallmentsInput.Errors.invalid'),
        })
        .min(1, t('InstallmentsInput.Errors.invalid')),
    })
    .superRefine((values, ctx) => {
      if (!validateDate(values.validate)) {
        ctx.addIssue({
          path: ['validate'],
          code: z.ZodIssueCode.invalid_string,
          message: t('ValidateInput.Errors.invalid'),
          validation: 'date',
        })
      }
    })

  type formTypeSchema = z.infer<typeof formSchema>

  const form = useForm<formTypeSchema>({
    resolver: zodResolver(formSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm<formTypeSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
      creditCard: '',
      validate: '',
      parcelValue: '',
    },
  })

  const onSubmit: SubmitHandler<formTypeSchema> = (data) => {
    console.log(data)
    reset()
  }

  const maxLengthCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength)
    }
  }

  const cpf = watch('cpf')
  const creditCard = watch('creditCard')
  const validate = watch('validate')

  useEffect(() => {
    setValue('cpf', cpfMask(cpf))
    setValue('creditCard', creditCardMask(creditCard))
    setValue('validate', validateMask(validate))
  }, [cpf, creditCard, validate, setValue])

  const payCreditCardValue = data ? data.value / data.parcels : 0

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full flex flex-col items-center gap-7"
      >
        <div className="relative w-full">
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.name ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200`}
            htmlFor="name"
          >
            {t('NameInput.input')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder={t('NameInput.placeholder')}
            className={`${inputDefaultStyle} ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.name ? (
            <span className="text-sm font-semibold text-red-500">
              {errors.name.message}
            </span>
          ) : null}
        </div>

        <div className="relative w-full">
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.cpf ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200`}
            htmlFor="cpf"
          >
            {t('CPFInput.input')}
          </label>
          <input
            type="text"
            id="cpf"
            {...register('cpf')}
            maxLength={14}
            onInput={maxLengthCheck}
            placeholder={t('CPFInput.placeholder')}
            className={`${inputDefaultStyle} ${errors.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.name ? (
            <span className="text-sm font-semibold text-red-500">
              {errors.cpf?.message}
            </span>
          ) : null}
        </div>

        <div className="relative w-full">
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.creditCard ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200`}
            htmlFor="creditCard"
          >
            {t('CreditCardInput.input')}
          </label>
          <input
            type="text"
            id="creditCard"
            {...register('creditCard')}
            maxLength={19}
            placeholder={t('CreditCardInput.placeholder')}
            className={`${inputDefaultStyle} ${errors.creditCard ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.creditCard ? (
            <span className="text-sm font-semibold text-red-500">
              {errors.creditCard.message}
            </span>
          ) : null}
        </div>

        <div className="w-full flex justify-center gap-7">
          <div className="relative w-full">
            <label
              className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.validate ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200`}
              htmlFor="validate"
            >
              {t('ValidateInput.input')}
            </label>
            <input
              type="text"
              id="validate"
              {...register('validate')}
              maxLength={5}
              onInput={maxLengthCheck}
              placeholder="00/00"
              className={`${inputDefaultStyle} ${errors.validate ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full flex-grow`}
            />
            {errors.validate ? (
              <span className="text-sm font-semibold text-red-500">
                {errors.validate.message}
              </span>
            ) : null}
          </div>

          <div className="relative w-full">
            <label
              className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.cvv ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200`}
              htmlFor="cvv"
            >
              {t('CVVInput.input')}
            </label>
            <input
              id="cvv"
              type="number"
              maxLength={3}
              onInput={maxLengthCheck}
              {...register('cvv')}
              placeholder="000"
              className={`${inputDefaultStyle} ${errors.cvv ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full flex-grow`}
            />
            {errors.cvv ? (
              <span className="text-sm font-semibold text-red-500">
                {errors.cvv.message}
              </span>
            ) : null}
          </div>
        </div>

        <FormField
          control={control}
          name="parcelValue"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <label
                className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.parcelValue ? 'text-red-500' : 'text-black'} text-sm font-semibold transition-colors duration-200 z-20`}
                htmlFor="parcelValue"
              >
                {t('InstallmentsInput.input')}
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`${errors.parcelValue ? 'border-red-500' : 'border-gray'}`}
                    id="parcelValue"
                  >
                    <SelectValue
                      placeholder={t('InstallmentsInput.placeholder')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data ? (
                    <SelectGroup>
                      {parcels.map((parcel) => (
                        <SelectItem
                          key={parcel.id}
                          value={(
                            payCreditCardValue / parcel.parcels
                          ).toString()}
                        >
                          {parcel.parcels}x {t('InstallmentsInput.span-text')}{' '}
                          {formatCurrency(payCreditCardValue / parcel.parcels)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : null}
                </SelectContent>
              </Select>
              {errors.parcelValue ? (
                <span className="text-sm font-semibold text-red-500">
                  {errors.parcelValue.message}
                </span>
              ) : null}
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" name={t('submit-button')} />
      </form>
    </Form>
  )
}

const inputDefaultStyle =
  'border-2 rounded-lg h-[65px] px-5 text-[18px] font-semibold placeholder:text-graytext outline-none transition-colors duration-200'
