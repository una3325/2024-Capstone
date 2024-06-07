import { PrismaClient } from '@prisma/client'
import { fakerKO as faker } from '@faker-js/faker'

const prisma = new PrismaClient()
export const CATEGORY = [
  '전망좋은',
  '자연',
  '동굴',
  '캠핑장',
  '방',
  '한옥',
  '해변',
  '국립공원',
  '인기',
  '수영장',
  '농장',
  '통나무집',
  '디자인',
  '스키',
  '호수',
  '키즈',
  '저택',
  '신규',
  '섬',
  '주택',
  '서핑',
  '골프장',
]

async function seedUsers() {
  Array.from({ length: 10 }, (v, i) => i).forEach(async () => {
    const userData = {
      email: faker.internet.email(),
      name: faker.person.lastName() + faker.person.firstName(),
      image: faker.image.avatar(),
      desc: faker.lorem.paragraph(),
    }

    const res = await prisma.user.create({
      data: userData,
    })

    console.log(res)
  })
}

//최대가 totalUsers.length, 0~totalUsers.length인덱스로 받고, 인덱스를 사용해서 가져온 10명의 user중 random으로 하나 선택
async function seedRooms() {
  const totalUsers = await prisma.user.findMany()
  if (totalUsers?.length > 1) {
    Array.from({ length: 40 }, (v, i) => i).forEach(async () => {
      const randomUserIndex = Math.floor(Math.random() * totalUsers.length)
      const randomUser = totalUsers[randomUserIndex]

      const roomdata = {
        title: faker.lorem.words(),
        images: [
          faker.image.urlLoremFlickr({
            category: 'hotel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'travel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'nature',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'building',
            width: 500,
            height: 500,
          }),
        ],
        lat: getRandomLatitud(),
        lng: getRendonLongtitude(),
        address:
          faker.location.state() +
          faker.location.street() +
          faker.location.streetAddress({
            useFullAddress: true,
          }),
        desc: faker.lorem.paragraphs(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        bedroomDesc: faker.lorem.words(),
        price: parseInt(
          faker.commerce.price({ min: 50000, max: 500000, dec: 0 }),
        ),
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        hasFreeLaundary: faker.datatype.boolean(),
        hasAirConditioner: faker.datatype.boolean(),
        hasWifi: faker.datatype.boolean(),
        hasBarbeque: faker.datatype.boolean(),
        hasFreeParking: faker.datatype.boolean(),
        userId: randomUser.id,
      }

      const res = await prisma.room.create({
        data: roomdata,
      })

      console.log(res)
    })
  }
}

//서울 위도/경도값 랜덤 생성 함수

function getRandomLatitud() {
  const minLatitude = 37.4316
  const maxLatitude = 37.701

  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      precision: 0.000001,
    })
    ?.toString()
}

function getRendonLongtitude() {
  const minLongtitude = 126.7963
  const maxLongtitude = 127.1839

  return faker.number
    .float({
      min: minLongtitude,
      max: maxLongtitude,
      precision: 0.000001,
    })
    ?.toString()
}

async function seedFaqs() {
  Array.from({ length: 10 }, (v, i) => i).forEach(async () => {
    const faqData = {
      title: faker.lorem.words(),
      desc: faker.lorem.paragraph(),
    }

    const res = await prisma.faq.create({
      data: faqData,
    })

    console.log(res)
  })
}

async function main() {
  //await seedUsers()
  await seedRooms()
  //await seedFaqs()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
