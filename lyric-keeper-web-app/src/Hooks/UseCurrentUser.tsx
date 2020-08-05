import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { Query_Get_Current_User } from "operations";
import {
  Get_Current_UserVariables,
  Get_Current_User,
  Get_Current_User_getCurrentUser,
} from "Types";
import { UseIsOffline } from "./UseIsOffline";

interface SetUserTypes {
  uid: string;
  email: string;
}

interface CurrentUserShape extends SetUserTypes {
  lyrics: Get_Current_User_getCurrentUser["lyrics"];
  playlists: Get_Current_User_getCurrentUser["playlists"];
}

export interface UseCurrentUserReturnShape {
  setUser: React.Dispatch<any>;
  currentUser: CurrentUserShape | null;
  currentUserIsLoading: boolean;
  isLoggedIn: boolean;
  logout(): void;
}

const getFromLocalStorage = (item: string) =>
  window.localStorage.getItem(item) || "";

const setToLocalStorage = (key: string, val: any) =>
  window.localStorage.setItem(key, JSON.stringify(val));

const getValueFromPersistantUser = (val: string) => {
  if (getFromLocalStorage("currentUser")) {
    if (JSON.parse(getFromLocalStorage("currentUser") as any) !== null) {
      return { ...JSON.parse(getFromLocalStorage("currentUser") as any) }[val];
    } else {
      return null;
    }
  }
};

export const UseCurrentUser = () => {
  const { isOnline } = UseIsOffline();

  // Use userConfigItems for adding new user items in the future
  const [userConfigItems, setUserConfigItems] = useState<Partial<SetUserTypes>>(
    { email: getValueFromPersistantUser("email") || "" }
  );
  const [currentUid, setCurrentUid] = useState<string | null>(
    getValueFromPersistantUser("uid")
  );
  const [currentUser, setCurrentUser] = useState<CurrentUserShape | null>(
    (getFromLocalStorage("currentUser") &&
      JSON.parse(getFromLocalStorage("currentUser") as any)) ||
      null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    getFromLocalStorage("isLoggedIn").includes("true")
  );
  // Skip the first query for Get_Current_User since currentUid will initially be null
  const [skip, setSkip] = useState(typeof currentUid !== "string");

  const { data, error, loading, refetch } = useQuery<
    Get_Current_User,
    Get_Current_UserVariables
  >(Query_Get_Current_User, {
    skip,
    variables: { uid: currentUid ? currentUid : "" },
  });

  // Use persistant storage to keep track of current user data across the site
  useEffect(() => {
    setToLocalStorage("isLoggedIn", `${isLoggedIn}`);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isOnline) setToLocalStorage("currentUser", currentUser);
  }, [currentUser, isOnline]);

  if (error) console.log(error);

  useEffect(() => {
    if (currentUid && !skip && isOnline) {
      refetch();
      setCurrentUser({
        uid: currentUid,
        email: userConfigItems?.email || "",
        lyrics: data?.getCurrentUser?.lyrics ? data?.getCurrentUser.lyrics : [],
        playlists: data?.getCurrentUser?.playlists
          ? data?.getCurrentUser.playlists
          : [],
      });
      setToLocalStorage("currentUser", {
        uid: currentUid,
        email: userConfigItems?.email || "",
        lyrics: data?.getCurrentUser?.lyrics ? data?.getCurrentUser.lyrics : [],
        playlists: data?.getCurrentUser?.playlists
          ? data?.getCurrentUser.playlists
          : [],
      });
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, currentUid, data]);

  const setUser = ({ uid, email }: SetUserTypes) => {
    setCurrentUid(() => {
      setSkip(false);
      setUserConfigItems({ email });
      return uid;
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentUid(null);
  };

  const returnObj: UseCurrentUserReturnShape = {
    setUser,
    currentUser,
    currentUserIsLoading: loading,
    isLoggedIn,
    logout,
  };

  return returnObj;
};
