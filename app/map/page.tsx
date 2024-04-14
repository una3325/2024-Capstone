'use client'

import { useState } from 'react'

import Map from '@/components/Map'
import { RoomType } from '@/interface'
import SelectedRoom from '@/components/Map/SelectedRoom'

export default function MapPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null)

  return (
    <>
      <Map setSelectedRoom={setSelectedRoom} />
      <SelectedRoom
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
    </>
  )
}
