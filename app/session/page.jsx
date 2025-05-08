'use client';

import React, { useEffect, useState, useMemo } from "react";
import CalendarStrip from "../../components/CalendarStrip/CalendarStrip";
import Card from "../../components/card/index";
import FooterNav from "../../components/Navbar/footerNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
} from "../../store/sessionsSlice";
import LoadingState from "../../components/LoadingState";
import { useEvent } from "../../hooks/useEvent";
import { setSessionData } from "../../store/sessionsDataSlice.js";

// Mock data for sessions (replace with your actual data)
const mockSessions = [
  {
    _id: "1",
    title: "Morning Session",
    startTime: "09:00",
    endTime: "10:30",
    // Add other session properties as needed
  },
  {
    _id: "2",
    title: "Afternoon Session",
    startTime: "14:00",
    endTime: "15:30",
    // Add other session properties as needed
  }
];

const Sessions = () => {
  const dispatch = useDispatch();
  const { eventId } = useEvent();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const sessionData = useSelector((state) => state.sessionData.sessionData); 

  // Memoize the session count check
  const hasSessions = useMemo(() => Object.keys(sessionData).length > 0, [sessionData]);

  useEffect(() => {
    if (!eventId) return;

    const loadSessions = () => {
      dispatch(setLoading(true));
      try {
        // Instead of API call, we're using mock data
        mockSessions.forEach(session => {
          dispatch(setSessionData({ sessionId: session._id, data: session }));
        });
      } catch (error) {
        console.error("❌ Error loading sessions:", error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      }
    };

    // Initial load
    if (isInitialLoad) {
      console.log('📥 Loading sessions...');
      loadSessions();
    }
  }, [dispatch, eventId, isInitialLoad]);

  // Show loading state if sessions are empty
  if (!hasSessions && eventId) {
    return (
      <LoadingState
        title="Loading Sessions"
        subtitle="We're getting your sessions ready"
      />
    );
  }

  return (
    <div className="bg-gray-900 h-screen flex flex-col justify-between">
      <div className="w-full bg-gray-900 text-gray-100">
        <div className="p-4">
          <CalendarStrip />
        </div>
        {Object.values(sessionData).map((session) => (
          <Card key={session.sessionId} session={session.data}  />
        ))}
      </div>

      <FooterNav />
    </div>
  );
};

export default Sessions;
