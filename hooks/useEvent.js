"use client";
import { useState, useEffect } from "react";
import { eventService } from "../service/api";

export const useEvent = () => {
  const [eventId, setEventId] = useState("");
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);

  useEffect(() => {
    const fetchEventId = async () => {
      try {
        const data = await eventService.getEventByDomain();
        if (data.success && data.domainData?.event?._id) {
          setEventId(data.domainData.event._id);
        } else {
          setError("Failed to fetch event information");
        }
      } catch (error) {
        console.error("Error fetching Event Id", error);
        setError("Failed to fetch event information");
      }
    };

    // Only fetch on client side
    if (typeof window !== 'undefined') {
      fetchEventId();
    }
  }, []);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        // Fetch banner data
        const bannerData = await eventService.getEventDetails(eventId);
        if (bannerData.success) {
          setBannerData(bannerData);
        } else {
          setError("Failed to fetch banner data");
        }

        // Fetch recap settings
        const recapData = await eventService.getRecapSettings(eventId);
        if (recapData.success) {
          setLoginRequired(recapData.response[0]?.enableLogin || false);
        } else {
          setError("Failed to fetch recap settings");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return {
    eventId,
    bannerData,
    error,
    loading,
    loginRequired,
  };
};
