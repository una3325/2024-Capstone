'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import { useForm } from 'react-hook-form'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'

interface RoomImageProps {
  images?: string[]
}

export default function RoomRegisterImage() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomImageProps>()

  const onSubmit = (data: RoomImageProps) => {
    // roomForm API 생성 요청
    // 생성 후에는 resetRoomForm으로 리코일 초기화
    // 내가 등록한 숙소 리스트로 돌아가도록 라우팅
  }

  return (
    <>
      <Stepper count={5} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 사진을 추가해주세요
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center">
          숙소 사진은 최대 5장까지 추가할 수 있습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-rose-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-600 focus-within:ring-offset-2 hover:text-rose-500"
                  >
                    <span>최대 5장의 사진을</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">업로드 해주세요</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          {errors?.images && errors?.images?.type === 'required' && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" text="완료" />
      </form>
    </>
  )
}
