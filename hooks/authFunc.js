import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

const AuthContext = createContext();
WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const tempUserInfo = {
    name: "Sheywun",
    photoURL: "https://i.ibb.co/48BkVk9/useful1.jpg",
  };
  //hook to set user
  const [userInfo, setUserInfo] = useState(tempUserInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //client IDs from .env
  const config = {
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  };
  //request - An instance of AuthRequest that can be used to prompt the user for authorization. This will be null until the auth request has finished loading.
  //response - This is null until promptAsync has been invoked. Once fulfilled it will return information about the authorization.
  //promptAsync - When invoked, a web browser will open up and prompt the user for authentication. Accepts an AuthRequestPromptOptions object with options about how the prompt will execute.
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  //function to get user info from token
  const getUserInfo = async (token) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      setError(response.statusText);
    }
  };

  useEffect(() => {
    //get user from store
    AsyncStorage.getItem("user")
      .then((userJSON) => {
        if (userJSON) {
          setUserInfo(JSON.parse(userJSON));
        } else if (response?.type === "success") {
          getUserInfo(response.authentication.accessToken);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [response]);

  //prompt google signin option
  const signInWithGoogle = async () => {
    setLoading(true);
    await promptAsync()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    setLoading(true);
    setUserInfo(null);
    AsyncStorage.removeItem("user").then(() => {
      setLoading(false);
    });
  };

  //cache values
  const memoValue = useMemo(
    () => ({
      user: userInfo,
      signInWithGoogle,
      loading,
      logout,
      error,
    }),
    [userInfo, error, loading]
  );

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
//export hook
export default function authFunc() {
  return useContext(AuthContext);
}
