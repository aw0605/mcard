import Button from '@shared/Button'

import { adBanners } from '@/mock/data'
import { COLLECTIONS } from '@constants/index'

import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

function BannerListAddBtn() {
  const handleBtnClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      batch.set(docRef, banner)
    })

    await batch.commit()
    alert('배너 리스트 추가완료!')
  }

  return <Button onClick={handleBtnClick}>배너 리스트 추가하기</Button>
}

export default BannerListAddBtn
