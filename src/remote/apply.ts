import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants'

import { ApplyValues } from '@models/apply'

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapShot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId),
    ),
  )

  const [applied] = snapShot.docs

  updateDoc(applied.ref, applyValues)
}
