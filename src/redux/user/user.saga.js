import {all, call, put, takeLatest} from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {auth, CreateUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase-utils";
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.actions";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(CreateUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield (put(signOutSuccess()));
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload : {email, password, displayName}}) {
    try {
        const {user} = yield  auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapShotFromUserAuth(user, additionalData);
}
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
};

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}