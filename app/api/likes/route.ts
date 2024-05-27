import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

import prisma from '@/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      {
        error: 'unauthorized user',
      },
      { status: 401 },
    )
  }

  const formData = await req.json()
  const { roomId } = formData

  // Like 데이터가 있는지 아닌지 확인 (있다면 찜하기 누른 상태)
  let like = await prisma.like.findFirst({
    where: {
      roomId,
      userId: session?.user?.id,
    },
  })

  if (like) {
    // 이미 찜을 한 상황이므로, 삭제하기
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    })

    return NextResponse.json(like, {
      status: 200,
    })
  } else {
    // 찜을 하지 않았으므로, 생성하기
    like = await prisma.like.create({
      data: {
        roomId,
        userId: session?.user?.id,
      },
    })

    return NextResponse.json(like, {
      status: 201,
    })
  }
}
