import { collection, getDocs, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

// Only ever reads products explicitly marked "Show on public website" by
// staff — the security rules enforce this same restriction server-side too.
export async function listPublicEquipment() {
  const q = query(collection(db, 'products'), where('publicListed', '==', true), orderBy('name', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Submits a new rental request. This is the only write this site can ever
// make — security rules require these exact fields and a fixed status.
export async function submitOrderRequest(data) {
  const ref = await addDoc(collection(db, 'onlineOrders'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp()
  })
  return ref.id
}
