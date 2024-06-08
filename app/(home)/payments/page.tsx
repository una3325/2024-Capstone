'use client'

import { useEffect, useRef } from 'react'
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk'
import { v4 as uuidv4 } from 'uuid'
import { useAsync } from 'react-use'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const clientKey = 'test_ck_Z1aOwX7K8mEba00kpj0P8yQxzvNP'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const price = searchParams.get('totalAmount') || '0'
  const customerKey = searchParams.get('customerKey') || uuidv4()
  const totalDays = searchParams.get('totalDays') || '0'
  const roomTitle = searchParams.get('roomTitle') || 'Fastcampus NextBnB'
  const bookingId = searchParams.get('bookingId')
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null)

  useAsync(async () => {
    // 결제 위젯 초기화
    // 비회원 결제는 ANONYMOUS
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey) // 회원 결제

    // 결제 위젯 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      {
        value: parseInt(price),
      },
      { variantKey: 'DEFAULT' },
    )

    // 이용약관 렌더링
    paymentWidget.renderAgreement('#agreement')

    paymentWidgetRef.current = paymentWidget
    paymentMethodsWidgetRef.current = paymentMethodsWidget
  }, [])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current
    if (paymentMethodsWidget == null) {
      return
    }
    // 금액 업데이트
    paymentMethodsWidget.updateAmount(parseInt(price))
  }, [price])

  return (
    <div className="max-w-2xl mx-auto px-4 my-20">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
        <p className="text-gray-600 mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일
          내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러
          예약을 결제하세요.
        </p>
        {(paymentWidgetRef === null || paymentMethodsWidgetRef === null) && (
          <Loader />
        )}
        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current

            try {
              // '결제하기'버튼 누를때 결제창 띄우기
              const uniqueOrderId = uuidv4()

              await paymentWidget
                ?.requestPayment({
                  orderId: uniqueOrderId,
                  orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                  customerName: session?.user.name || '익명',
                  customerEmail: session?.user.email || '',
                  // redirect URL 처리하려면 successUrl, failUrl 추가하기
                })
                .then(async function (data) {
                  // 성공 처리: 결제 승인 API를 호출하세요
                  // 결제창 입력 완료시 1차로 요청된 payment 데이터 생성
                  const res = await axios.post('/api/payments', {
                    bookingId: bookingId,
                    amount: price,
                    status: 'IN_PROGRESS',
                    orderId: uniqueOrderId,
                    orderName: `${roomTitle?.slice(0, 10)}_${totalDays}박`,
                  })

                  if (res?.status === 200 && data) {
                    router.replace(
                      `/payments/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount}`,
                    )
                  }
                })
                .catch(function (error) {
                  // 에러 처리: 에러 목록을 확인하세요
                  // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
                  if (error.code === 'USER_CANCEL') {
                    // 결제 고객이 결제창을 닫았을 때 에러 처리
                    toast?.error('결제가 종료되었습니다.')
                  } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드에 대한 에러 처리
                    toast?.error('유효하지 않은 카드 코드입니다.')
                  } else {
                    // 그 외의 경우 에러 메세지
                    toast?.error(
                      error?.message || '문제가 생겼습니다. 다시 시도해주세요',
                    )
                  }
                })
            } catch (error) {
              console.log(error)
            }
          }}
          type="button"
          className="mt-8 bg-lime-600 hover:bg-lime-500 text-white rounded-md px-5 py-2.5"
        >
          결제하기
        </button>
      </div>
    </div>
  )
}
