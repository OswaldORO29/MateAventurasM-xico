import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    signInWithCustomToken,
    signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { doc, getDoc, getFirestore, setDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

export function createFirebaseProfileService({ onProfileLoaded, onError }) {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'mateaventuras-pro-app';
    let database = null;
    let auth = null;
    let currentUser = null;

    function getProfileReference() {
        return doc(database, 'artifacts', appId, 'users', currentUser.uid, 'profile', 'main');
    }

    async function saveProfile(profile) {
        if (!currentUser || !database) return false;

        await setDoc(getProfileReference(), {
            ...profile,
            mistakes: profile.mistakes.slice(0, 35),
            updatedAt: Date.now()
        }, { merge: true });
        return true;
    }

    async function loadProfile(getCurrentProfile) {
        if (!currentUser || !database) return;

        const snapshot = await getDoc(getProfileReference());
        if (snapshot.exists()) {
            onProfileLoaded(snapshot.data());
        } else {
            await saveProfile(getCurrentProfile());
        }
    }

    async function initialize(getCurrentProfile) {
        if (typeof __firebase_config === 'undefined' || !__firebase_config) return false;

        const firebaseConfig = JSON.parse(__firebase_config);
        const app = initializeApp(firebaseConfig);
        database = getFirestore(app);
        auth = getAuth(app);

        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }

        onAuthStateChanged(auth, async (user) => {
            currentUser = user;
            if (!user) return;

            try {
                await loadProfile(getCurrentProfile);
            } catch (error) {
                onError(error);
            }
        });

        return true;
    }

    async function signInOrRegister(email, password) {
        if (!auth) return false;

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            currentUser = credential.user;
        } catch (error) {
            if (!['auth/user-not-found', 'auth/invalid-credential'].includes(error.code)) {
                throw error;
            }
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            currentUser = credential.user;
        }
        return true;
    }

    return { initialize, loadProfile, saveProfile, signInOrRegister };
}
