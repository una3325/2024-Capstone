'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'

interface RoomAddressProps {
  address?: string
}

export default function RoomRegisterAddress() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomAddressProps>()

  const onSubmit = (data: RoomAddressProps) => {
    setRoomForm({
      ...roomForm,
      address: data?.address,
    })
    router.push('/rooms/register/feature')
  }

  useEffect(() => {
    if (roomForm) {
      setValue('address', roomForm.address)
    }
  }, [roomForm, setValue])

  return (
    <>
      <Stepper count={3} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 위치를 입력해주세요
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-lg font-semibold">
            숙소 위치
          </label>
          <input
            {...register('address', { required: true })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
          />
          {errors.address && errors.address.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" />
      </form>
    </>
  )
}
