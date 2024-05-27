import { RoomType } from '@/interface'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function Comment({ data }: { data: RoomType }) {
  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentList />
      <CommentForm />
    </div>
  )
}
