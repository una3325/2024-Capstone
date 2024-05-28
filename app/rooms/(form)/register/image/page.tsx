'use client'

import { roomFormState } from '@/atom'
import { useRouter } from 'next/navigation'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { useForm } from 'react-hook-form'
import Stepper from '@/components/Form/Stepper'
import NextButton from '@/components/Form/NextButton'
import { AiFillCamera } from 'react-icons/ai'
import toast from 'react-hot-toast'
import axios from 'axios'

interface RoomImageProps {
  images?: string[]
}

const IMAGE_URLS = [
  'https://loremflickr.com/500/500/hotel?lock=2398148622286848',
  'https://loremflickr.com/500/500/travel?lock=46018368372736',
  'https://loremflickr.com/500/500/nature?lock=7854363563261952',
  'https://loremflickr.com/500/500/building?lock=7014313585803264',
]

export default function RoomRegisterImage() {
  const router = useRouter()
  const [roomForm, setRoomForm] = useRecoilState(roomFormState)
  const resetRoomForm = useResetRecoilState(roomFormState)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomImageProps>()

  const onSubmit = async (data: RoomImageProps) => {
    // roomForm API 생성 요청
    // 생성 후에는 resetRoomForm으로 리코일 초기화
    // 내가 등록한 숙소 리스트로 돌아가도록 라우팅
    try {
      const result = await axios.post('/api/rooms', {
        ...roomForm,
        images: IMAGE_URLS,
      })

      if (result.status === 200) {
        toast.success('숙소를 등록했습니다.')
        resetRoomForm()
        router.push('/')
      } else {
        toast.error('데이터 생성중 문제가 발생했습니다.')
      }
    } catch (e) {
      console.log(e)
      toast.error('다시 시도해주세요')
    }
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
                <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
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
            <span className="text-green-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" text="완료" />
      </form>
    </>
  )
}
