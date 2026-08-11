import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

// Only ever reads products explicitly marked "Show on public website" by
// staff — the security rules enforce this same restriction server-side too.
// Sorted here (not via Firestore orderBy) so this never needs a composite
// index set up in Firebase Console — one less manual setup step.
export async function listPublicEquipment() {
  const q = query(collection(db, 'products'), where('publicListed', '==', true))
  const snap = await getDocs(q)
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  items.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  return items
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
