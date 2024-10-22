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
  console.log("[AppleLogin] Beginning Apple Authentication");

  // start a login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
    });

    const { identityToken, fullName } = appleAuthRequestResponse;
    console.log("[AppleLogin] identityToken :", identityToken);
    console.log("[AppleLogin] fullName :", fullName);
    if (!identityToken) {
      throw new Error("[AppleLogin] Apple Authentication failed - no identify token returned");
    }
    return { token: identityToken, firstName: fullName?.familyName ?? "", lastName: fullName?.givenName ?? "" };
  } catch (error) {
    console.error(error);
  }
}
