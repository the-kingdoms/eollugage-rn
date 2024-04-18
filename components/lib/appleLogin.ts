import appleAuth from "@invertase/react-native-apple-authentication";

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
  if (user === null) {
    updateCredentialStateForUser("N/A");
  } else {
    const credentialState = await appleAuth.getCredentialStateForUser(user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      updateCredentialStateForUser("AUTHORIZED");
    } else {
      updateCredentialStateForUser(credentialState);
    }
  }
}
*/

export default async function appleLogin() {
  console.log("Beginning Apple Authentication");

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log("appleAuthRequestResponse", appleAuthRequestResponse);

    const { user: newUser, email, nonce, identityToken, realUserStatus } = appleAuthRequestResponse;

    if (identityToken) {
      // 백엔드 서버로 요청 보내기..?
      // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
      console.log(nonce, identityToken);
    } else {
      // 실패시?
      // no token - failed sign-in?
    }
  } catch (error) {
    console.error(error);
  }
}
