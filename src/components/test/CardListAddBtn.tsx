import Button from '@shared/Button'

import { card_list } from '@/mock/data'
import { COLLECTIONS } from '@constants/index'

import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

function CardListAddBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    await batch.commit()
    alert('카드 리스트 추가완료!')
  }

  return <Button onClick={handleBtnClick}>카드 리스트 추가하기</Button>
}

export default CardListAddBtn
