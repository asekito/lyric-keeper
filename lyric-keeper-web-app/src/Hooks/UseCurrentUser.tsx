import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { Query_Get_Current_User } from "operations";
import {
  Get_Current_UserVariables,
  Get_Current_User,
  Get_Current_User_getCurrentUser,
} from "Types";

interface SetUserTypes {
  uid: string;
}

interface CurrentUserShape {
  uid: string;
  lyrics: Get_Current_User_getCurrentUser[] | [];
}

export interface UseCurrentUserReturnShape {
  setUser: React.Dispatch<any>;
  currentUser: CurrentUserShape | null;
  currentUserIsLoading: boolean;
  isLoggedIn: boolean;
}

const getFromLocalStorage = (item: string) =>
  window.localStorage.getItem(item) || "";

const setToLocalStorage = (key: string, val: any) =>
  window.localStorage.setItem(key, JSON.stringify(val));

export const UseCurrentUser = () => {
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserShape | null>(
    JSON.parse(getFromLocalStorage("currentUser") as any) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    getFromLocalStorage("isLoggedIn").includes("true")
  );
  const [skip, setSkip] = useState(true);

  const { data, error, loading, refetch } = useQuery<
    Get_Current_User,
    Get_Current_UserVariables
  >(Query_Get_Current_User, {
    skip,
    variables: { uid: currentUid ? currentUid : "" },
  });

  useEffect(() => {
    setToLocalStorage("isLoggedIn", `${isLoggedIn}`);
  }, [isLoggedIn]);

  useEffect(() => {
    setToLocalStorage("currentUser", currentUser);
  }, [currentUser]);

  if (error) console.log(error);

  useEffect(() => {
    if (currentUid && !skip) {
      refetch();
      setCurrentUser({
        uid: currentUid,
        lyrics: data?.getCurrentUser ? data?.getCurrentUser : [],
      });
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const setUser = ({ uid }: SetUserTypes) => {
    setCurrentUid(() => {
      setSkip(false);
      return uid;
    });
  };

  const returnObj: UseCurrentUserReturnShape = {
    setUser,
    currentUser,
    currentUserIsLoading: loading,
    isLoggedIn,
  };

  return returnObj;
};
