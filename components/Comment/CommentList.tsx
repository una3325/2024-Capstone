'use client'

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import CommentListModal from './CommentListModal'

export const COMMENTS = [
  {
    id: 1,
    name: '사용자',
    createdAt: '2023-10-22',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas mi ut ante ultricies, eget tempus nisi sollicitudin. Phasellus sed justo at dui bibendum volutpat sed ac dolor. I',
    imageUrl: 'https://avatars.githubusercontent.com/u/23611758',
  },
  {
    id: 2,
    name: '리액트',
    createdAt: '2023-10-23',
    comment:
      'Integer molestie condimentum mi. Integer faucibus lorem nec placerat pellentesque. Maecenas quis lectus sed orci posuere commodo.',
    imageUrl:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/378.jpg',
  },
  {
    id: 3,
    name: '넥스트',
    createdAt: '2023-10-24',
    comment:
      'Praesent condimentum euismod sapien nec euismod. Phasellus cursus vulputate elit, molestie euismod sem ultricies aliquam.',
    imageUrl:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/239.jpg',
  },
  {
    id: 4,
    name: '김철수',
    createdAt: '2023-10-25',
    comment:
      'Etiam augue neque, ullamcorper eu augue eget, feugiat tristique nibh. Morbi et massa ut purus interdum rhoncus. Aliquam id tristique mauris.',
    imageUrl: 'https://avatars.githubusercontent.com/u/63259883',
  },
  {
    id: 5,
    name: '김영희',
    createdAt: '2023-10-25',
    comment:
      'Nullam vestibulum nunc id ligula commodo consequat. Nam eu libero non turpis molestie lobortis. Etiam ut pulvinar eros, et mattis erat.',
    imageUrl: 'https://avatars.githubusercontent.com/u/36817122',
  },
  {
    id: 6,
    name: '패스트',
    createdAt: '2023-10-25',
    comment:
      'Nullam vestibulum nunc id ligula commodo consequat. Nam eu libero non turpis molestie lobortis. Etiam ut pulvinar eros, et mattis erat.',
    imageUrl:
      'https://phinf.pstatic.net/contact/20221209_229/16705671500172bRNN_PNG/emoji_profile.png',
  },
  ,
  {
    id: 7,
    name: '캠퍼스',
    createdAt: '2023-10-25',
    comment:
      'Nullam vestibulum nunc id ligula commodo consequat. Nam eu libero non turpis molestie lobortis. Etiam ut pulvinar eros, et mattis erat.',
    imageUrl:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/378.jpg',
  },
]

export default function CommentList() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const openModal = () => {
    setIsOpenModal(true)
  }

  return (
    <>
      <h1 className="font-semibold text-xl mb-2">후기 248개</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {COMMENTS?.slice(0, 6)?.map((comment) => (
          <div key={comment?.id} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img
                src={comment?.imageUrl || '/images/user-icon.png'}
                alt="profile img"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="font-semibold">{comment?.name || '-'}</h1>
                <div className="text-gray-500 text-xs">
                  {comment?.createdAt}
                </div>
              </div>
            </div>
            <div className="max-w-md text-gray-600">{comment?.comment}</div>
            <button
              type="button"
              onClick={openModal}
              className="underline font-semibold flex gap-1 items-center justify-start"
            >
              더보기 <BiChevronRight className="text-xl" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 mb-20">
        <button
          type="button"
          onClick={openModal}
          className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5"
        >
          후기 248개 모두 보기
        </button>
      </div>
      <CommentListModal isOpen={isOpenModal} closeModal={closeModal} />
    </>
  )
}
