"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "../button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Form, FormField, FormItem, FormControl } from "../ui/form"
import { parcels } from "@/utils/payment-values"
import { formatCurrency } from "@/utils/format-currency"
import { cpfMask, creditCardMask, validateMask } from "@/utils/input-masks"
import { useEffect } from "react"
import { validateDate } from "@/utils/validate-date"

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Mínimo de 2 caracteres.')
    .max(255, "Máximo de 255 caracteres.")
    .regex(/^^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras.'),
  cpf: z
    .string()
    .min(14, 'CPF inválido.')
    .max(14, 'CPF inválido.'),
  creditCard: z
    .string()
    .min(19, 'Número do cartão inválido.')
    .max(19, 'Número do cartão inválido.'),
  validate: z
    .string(),
  cvv: z
    .coerce
    .number()
    .positive('Número do CVV inválido.'),
  parcelNumber: z
    .string(),
}).superRefine((values, ctx) => {
  if (!validateDate(values.validate)) {
    ctx.addIssue({
      path: ['validate'],
      code: z.ZodIssueCode.invalid_string,
      message: 'Digite uma data válida e não vencida.',
      validation: 'date',
    })
  }
})

type formTypeSchema = z.infer<typeof formSchema>

export function CreditCardForm() {
  const form = useForm<formTypeSchema>({
    resolver: zodResolver(formSchema),
  })

  const { register, handleSubmit, formState: { errors }, control, watch, setValue, reset } = useForm<formTypeSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
      creditCard: '',
      validate: '',
      parcelNumber: ''
    }
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} action="" className="w-full flex flex-col items-center gap-7" >
        <div className="relative w-full" >
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.name ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200`}
            htmlFor="name"
          >
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Digite seu nome"
            className={`${inputDefaultStyle} ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.name ? (
            <span className="text-sm font-semibold text-red-500" >{errors.name.message}</span>
          ) : null}
        </div>

        <div className="relative w-full" >
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.cpf ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200`}
            htmlFor="cpf"
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            {...register('cpf')}
            maxLength={14}
            onInput={maxLengthCheck}
            placeholder="Digite seu CPF"
            className={`${inputDefaultStyle} ${errors.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.name ? (
            <span className="text-sm font-semibold text-red-500" >{errors.name.message}</span>
          ) : null}
        </div>

        <div className="relative w-full" >
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.creditCard ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200`}
            htmlFor="creditCard"
          >
            Número do cartão
          </label>
          <input
            type="text"
            id="creditCard"
            {...register('creditCard')}
            maxLength={19}
            placeholder="Digite o número do seu cartão"
            className={`${inputDefaultStyle} ${errors.creditCard ? 'border-red-500 focus:border-red-500' : 'border-gray focus:border-black'} w-full`}
          />
          {errors.creditCard ? (
            <span className="text-sm font-semibold text-red-500" >{errors.creditCard.message}</span>
          ) : null}
        </div>

        <div className="w-full flex justify-center gap-7" >
          <div className="relative w-full" >
            <label
              className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.validate ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200`}
              htmlFor="validate"
            >
              Validade
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
              <span className="text-sm font-semibold text-red-500" >{errors.validate.message}</span>
            ) : null}
          </div>

          <div className="relative w-full" >
            <label
              className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.cvv ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200`}
              htmlFor="cvv"
            >
              CVV
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
              <span className="text-sm font-semibold text-red-500" >{errors.cvv.message}</span>
            ) : null}
          </div>

        </div>

        <div className="relative w-full" >
          <label
            className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-[2px] ${errors.parcelNumber ? "text-red-500" : "text-black"} text-sm font-semibold transition-colors duration-200 z-20`}
            htmlFor="parcelNumber"
          >
            Parcelas
          </label>
          <FormField
            control={control}
            name="parcelNumber"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value} {...register('parcelNumber')} >
                  <FormControl>
                    <SelectTrigger id="parcelNumber" >
                      <SelectValue placeholder='Selecione o número de parcelas' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parcels.map((parcel) => (
                      <SelectItem key={parcel.id} value={parcel.id}>{parcel.parcels}x de {formatCurrency(15300.00 / parcel.parcels)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          >
          </FormField>
          {errors.parcelNumber ? (
            <span className="text-sm font-semibold text-red-500" >Selecione uma parcela</span>
          ) : null}
        </div>

        <Button
          type="submit"
          name="Pagar"
        />

      </form>
    </Form>
  )
}

const inputDefaultStyle = 'border-2 rounded-lg h-[65px] px-5 text-[18px] font-semibold placeholder:text-graytext outline-none transition-colors duration-200'