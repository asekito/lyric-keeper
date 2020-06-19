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

export const UseCurrentUser = () => {
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserShape | null>(null);
  const [skip, setSkip] = useState(true);

  const { data, error, loading, refetch } = useQuery<
    Get_Current_User,
    Get_Current_UserVariables
  >(Query_Get_Current_User, {
    skip,
    variables: { uid: currentUid ? currentUid : "" },
  });

  useEffect(() => {
    if (currentUid && !skip) {
      refetch();
      setCurrentUser({
        uid: currentUid,
        lyrics: data?.getCurrentUser ? data?.getCurrentUser : [],
      });
    }
  }, [skip]);

  const setUser = ({ uid }: SetUserTypes) => {
    setCurrentUid(uid);
    setSkip(false);
  };

  return { setUser, currentUser, currentUserIsLoading: loading };
};
