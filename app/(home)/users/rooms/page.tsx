'use client'

import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function UserRooms() {
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()

  const fetchMyRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/rooms?my=true&page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })

    return data
  }

  const { data: rooms, isError } = useInfiniteQuery(
    `rooms-user-${session?.user.id}`,
    fetchMyRooms,
    {
      getNextPageParam: (lastPage) =>
        lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
    },
  )

  if (!!isError) {
    throw new Error('room API fetching error')
  }

  return <></>
}
