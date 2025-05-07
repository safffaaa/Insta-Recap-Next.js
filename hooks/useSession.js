"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentSession,
  selectCurrentAudio,
  setCurrentAudio,
  setLoading,
  setError,
  setCurrentSession as setReduxCurrentSession,
} from "../store/sessionsSlice";
import { API_ENDPOINTS } from "../config/api";

export const useSession = () => {
  const dispatch = useDispatch();
  const currentSession = useSelector(selectCurrentSession);
  const currentAudio = useSelector(selectCurrentAudio);

  // useEffect(() => {
  //   const storedSession = localStorage.getItem("session");
  //   if (storedSession) {
  //     const parsedSession = JSON.parse(storedSession);
  //     dispatch(setReduxCurrentSession(parsedSession));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const fetchSessionAudio = async () => {
      if (!currentSession?._id) return;

      dispatch(setLoading(true));
      try {
        const response = await fetch(
          `${API_ENDPOINTS.SESSION}?sessionId=${currentSession._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(typeof window !== 'undefined' && localStorage.getItem("token")
                ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
                : {}),
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch session audio');
        }

        const data = await response.json();
        if (data.success) {
          dispatch(setCurrentAudio(data.audio));
        } else {
          throw new Error(data.message || 'Failed to fetch session audio');
        }
      } catch (error) {
        console.error("Error fetching session audio:", error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    // Only fetch on client side
    if (typeof window !== 'undefined') {
      fetchSessionAudio();
    }
  }, [dispatch, currentSession?._id]);

  return {
    currentSession,
    currentAudio,
  };
};
