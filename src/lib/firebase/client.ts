// firebase.ts or firebase/client.ts (create this file)
import { initializeApp, FirebaseApp,  getApps, getApp } from 'firebase/app'
import { type FirebaseConfig, firebaseConfig } from './config'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

let clientApp: FirebaseApp
function createFirebaseApp(config: FirebaseConfig) {

  // Initialize Firebase
  clientApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  return clientApp
}

function getFirebaseApp() {
//   if (typeof window === 'undefined') {
//     throw new Error('Do not call getClientFirebaseApp from the server.')
//   }

  if (!firebaseConfig.apiKey) {
    throw new Error(
      'NEXT_PUBLIC_FIREBASE_API_KEY is not defined. Make sure you have set all the required environment variables.',
    )
  }
  return clientApp ?? createFirebaseApp(firebaseConfig)
}

export const app = getFirebaseApp()

// export const db = getFirestore(app, 'personal')
export const db = getFirestore(app)

if (process.env.NODE_ENV === 'development') {
  // Important: Only for development!
  connectFirestoreEmulator(db, 'localhost', 8080) // Use the port you chose
}




