"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  bookmark,
  Bookmarkfill,
  calender,
  clock,
  Details,
  transcripted,
  takeAwaybluebookmarkfill,
  takeAwaybluebookmarkunfill,
} from "../../app/assets";
import { setCurrentAudio, setCurrentSession } from "../../store/sessionsSlice";
import { selectUser } from "../../store/authSlice";
import FunctionButton from "../../components/fuctionButton";

const CardImg = ({
  dataImg,
  name,
  role,
  company,
  designation,
  isProfileClicked,
  imgSize,
}) => {
  const imageUrl = dataImg.startsWith('http') ? dataImg : `https://${dataImg}`;

  return (
    <div className="flex gap-4 items-center justify-start">
      <div className={`${imgSize} rounded-full overflow-hidden relative`}>
        <Image 
          src={imageUrl} 
          alt={name} 
          fill
          className="object-cover"
          unoptimized={true}
        />
      </div>
      {isProfileClicked && (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-white">{name}</span>
          <span className="text-xs text-white">{role}, {company}</span>
        </div>
      )}
    </div>
  );
};

const Button = ({ buttonText, buttonIcon }) => (
  <div className="flex items-center gap-1 bg-green-100 rounded-full px-3 py-1">
    <img src={buttonIcon} alt="" className="w-4 h-4" />
    <span className="text-xs text-green-700">{buttonText}</span>
  </div>
);

const Card = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const imgSize = isProfileClicked ? "w-10 h-10" : "w-8 h-8";
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    if (currentPath.includes('/bookmark')) {
      setIsBookmarked(true);
    }
  }, [currentPath]);

  const showProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfileClicked((prev) => !prev);
  };

  const fetchSessionDetails = async () => {
    const sessionId = session._id;
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const url = new URL('/session', apiBaseUrl);
      url.searchParams.append('sessionId', sessionId);

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        dispatch(setCurrentAudio(data.audio));
      } else {
        throw new Error(data.message || "Session not found");
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      if (typeof setError === 'function') {
        dispatch(setError(error.message || "Failed to load session details"));
      }
    }
  };

  const handleCardClick = () => {
    dispatch(setCurrentSession(session));
    fetchSessionDetails();
    router.push(`/${session._id}/overview`);
  };

  const toggleBookmark = async (e) => {
    e.stopPropagation();
    
    const body = {
      ticketId: user.userId,
      session: session._id,
      event: session.event._id
    };

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const url = new URL(`/bookmarks/${isBookmarked ? 'remove' : 'add'}`, apiBaseUrl);
      
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();
      console.log(data);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Use actual speakers data from the session
  const visibleSpeakers = session.speakers ? session.speakers.slice(0, 3) : [];
  const remainingSpeakers = session.speakers ? session.speakers.length - 3 : 0;
  const [speakersExpanded, setSpeakersExpanded] = useState(false);

  const toggleSpeakersExpanded = (e) => {
    e.stopPropagation();
    setSpeakersExpanded(!speakersExpanded);
  };

  return (
    <div className="px-4 pb-4 space-y-4 bg-[rgb(16,19,26)]">
      <div className="bg-[rgb(40,44,58)] rounded-lg p-4" onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-3">
          <div className="w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <img src={calender} alt="" className="w-4 h-4" />
                <span className="text-xs text-gray-300 font-inter pl-1">
                  {formatDate(session.startTime)} | {session.stage?.stage}
                </span>
              </div>
              <Button buttonText="Transcripted" buttonIcon={transcripted} />
            </div>
            <h3 className="text-base font-medium mt-1 text-white font-inter border-[#868C98] border-b border-dotted py-2">
              {session.title}
            </h3>
          </div>
        </div>

        <div
          className={`${
            isProfileClicked ? "block" : "flex justify-between items-center"
          } transition-all duration-300 ease-in-out`}
        >
          <div
            onClick={showProfile}
            className={`relative ${
              isProfileClicked ? "bg-transparent" : "bg-white"
            } rounded-3xl px-1 py-1 cursor-pointer
            ${isProfileClicked ? "flex-col space-y-2 min-w-[200px]" : "flex"}
            transition-all duration-500 ease-in-out transition-background
            hover:bg-opacity-90`}
            style={{
              transitionProperty: 'all, background-color',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div
              className={`flex ${
                isProfileClicked ? "flex-col gap-3" : "-space-x-2"
              } transition-all duration-300 ease-in-out`}
            >
              {visibleSpeakers.map((speaker) => {
                const imgCdn = process.env.NEXT_PUBLIC_IMG_CDN || '';
                const photoUrl = speaker.photo ? `${imgCdn}${speaker.photo}` : '';
                
                return (
                  <CardImg
                    key={speaker.id || speaker._id}
                    imgSize={imgSize}
                    dataImg={photoUrl}
                    name={speaker.name}
                    role={speaker.designation || "Speaker"}
                    company={speaker.company}
                    isProfileClicked={isProfileClicked}
                  />
                );
              })}
              
              {!isProfileClicked && remainingSpeakers > 0 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <p className="text-sm text-gray-500">+{remainingSpeakers}</p>
                </div>
              )}
            </div>
            
            {isProfileClicked && (
              <div 
                className="flex items-center justify-between gap-1 mt-2 transition-all duration-300 ease-in-out opacity-100"
              >
                <div className="flex gap-1">
                  <img src={clock} alt="" className="w-4 h-4" />
                  <span className="text-xs text-[#CDD0D5]">
                    {formatTime(session.startTime)} - {formatTime(session.endTime)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex gap-2 items-center border-[#5BF5FF] border rounded-[7px] px-1 transition-all duration-300">
                    <img src={Details} alt="" /> Details
                  </button>
                  <button 
                    className="flex items-center border-[#5BF5FF] border rounded-[7px] px-1 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(e);
                    }}
                  >
                    <img src={isBookmarked ? Bookmarkfill : bookmark} alt="" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isProfileClicked && (
            <div className="flex gap-[12px] items-center">
              <div 
                className="flex items-center gap-1 transition-all duration-300 ease-in-out"
              >
                <img src={clock} alt="" className="w-4 h-4" />
                <span className="text-xs text-[#CDD0D5]">
                  {formatTime(session.startTime)} - {formatTime(session.endTime)}
                </span>
              </div>
              <FunctionButton
                onClick={(e) => toggleBookmark(e)}
                iconClassName="w-[24px]"
                icon={
                  isBookmarked ? takeAwaybluebookmarkfill : takeAwaybluebookmarkunfill
                }
              />
            </div>
          )}
        </div>

        {/* Expanded speakers view */}
        {speakersExpanded && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[rgb(40,44,58)] rounded-lg p-2 shadow-lg z-10">
            {session.speakers.map((speaker) => (
              <div
                key={speaker.id || speaker._id}
                className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_CDN}${speaker.photo}`}
                  alt={speaker.name}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <span className="ml-2 text-sm text-white">
                  {speaker.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  session: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    stage: PropTypes.shape({
      stage: PropTypes.string.isRequired,
    }),
    speakers: PropTypes.array,
    event: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Card;
