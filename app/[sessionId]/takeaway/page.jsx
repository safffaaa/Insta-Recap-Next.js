'use client';

import {
  takeAwaybluebookmarkfill,
  takeawaydetail,
  takewaycard,
  takewaypin,
  copy,
  share,
  takeAwaybluebookmarkunfill,
} from "../../assets";
import Menu from "../../../components/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import formatSummaryContent from "../../../Markdown";
import {
  selectCurrentSession,
  selectCurrentAudio,
  setCurrentAudio,
  setLoading,
  setError,
  setCurrentSession as setReduxCurrentSession,
} from "../../../store/sessionsSlice";
import { useEffect, useState } from "react";
import LoadingState from "../../../components/LoadingState";
import { useRouter } from "next/navigation";
import { selectIsAuthenticated } from "../../../store/authSlice";
import { useEvent } from "../../../hooks/useEvent";
import FunctionButton from '../../../components/fuctionButton/index';
import Link from 'next/link';
import Image from "next/image";

const OverviewTakeAway = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentSession = useSelector(selectCurrentSession);
  const currentAudio = useSelector(selectCurrentAudio);
  const { loginRequired } = useEvent();
  const [copyStates, setCopyStates] = useState({});
  const [bookmarkedTakeaways, setBookmarkedTakeaways] = useState({});

  // Check login requirement
  useEffect(() => {
    if (loginRequired && !isAuthenticated) {
      router.push("/login");
    }
  }, [loginRequired, isAuthenticated, router]);

  const [Data, setData] = useState({
    keyTakeaways: [
      {
        _id: '1',
        heading: 'Sample Takeaway',
        explanation: 'This is a sample explanation for the takeaway.',
        hashtags: ['sample', 'takeaway']
      },
      {
        _id: '2',
        heading: 'Another Takeaway',
        explanation: 'This is another sample explanation for the takeaway.',
        hashtags: ['example', 'insight']
      }
    ]
  });

  if (!currentAudio) {
    return (
      <LoadingState
        title="Loading Take Away"
        subtitle="We're finding your insights"
      />
    );
  }

  // Bookmark toggle function for individual takeaways
  const toggleBookmark = (takeawayId) => {
    console.log(takeawayId,' id');
    
    setBookmarkedTakeaways(prev => ({
      ...prev,
      [takeawayId]: !prev[takeawayId]
    }));
  };

  // Share function
  const handleShare = async (takeaway) => {
    const fullContent = `${takeaway.heading}\n\n${takeaway.explanation}\n\nHashtags: ${takeaway.hashtags.map(tag => `#${tag}`).join(' ')}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Key Takeaway",
          text: fullContent,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        try {
          await navigator.clipboard.writeText(fullContent);
          alert("Content copied to clipboard!");
        } catch (clipErr) {
          console.error("Error copying to clipboard:", clipErr);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullContent);
        alert("Content copied to clipboard!");
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  // Copy function
  const handleCopy = async (takeaway) => {
    const fullContent = `${takeaway.heading}\n\n${takeaway.explanation}\n\nHashtags: ${takeaway.hashtags.map(tag => `#${tag}`).join(' ')}`;
    try {
      await navigator.clipboard.writeText(fullContent);
      setCopyStates(prev => ({
        ...prev,
        [takeaway._id]: true
      }));
      
      setTimeout(() => {
        setCopyStates(prev => ({
          ...prev,
          [takeaway._id]: false
        }));
      }, 2000);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const sessionId = window.location.pathname.split('/')[1];

  return (
    <div className="bg-[#10131A] text-white font-inter p-4 sm:p-6 lg:p-8">
      <Menu />

      {/* Header Section */}
      <div className="flex items-center py-1 px-1 justify-between pb-6">
        <div className="flex items-center gap-1">
          <Image
            src={takewaypin}
            alt="overviewList"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
          <h2 className="font-inter text-[16px] font-[500] text-[#FFFFFF]">
            Take Away
          </h2>
        </div>
        <div className="flex justify-center bg-[#222534] rounded-[8px] py-1 px-1 items-center w-38">
          {/* Card Link */}
          <Link href={`/${sessionId}/takeaway`}>
            <div className="flex items-center justify-between border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={takewaycard}
                alt="Card"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[13px]">Card</button>
            </div>
          </Link>
          {/* Detail Link */}
          <Link href={`/${sessionId}/detailed`}>
            <div className="flex items-center border-0 text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={takeawaydetail}
                alt="Detail"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[12px] sm:text-[14px]">Detail</button>
            </div>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      {Data && Data.keyTakeaways ? (
        <>
          {Data.keyTakeaways.map((takeaway) => (
            <div
              key={takeaway._id}
              className="bg-[#282C3A] p-4 rounded-lg mb-6"
            >
              <h4 className="text-[13px] font-[500] mb-2">
                {formatSummaryContent(takeaway.heading)}
              </h4>
              <div className="text-[14px] leading-[18px] font-[400] font-inter text-[#CDD0D5]">
                {formatSummaryContent(takeaway.explanation)}
              </div>
              <div className="flex items-center flex-wrap mt-4 gap-3">
                {takeaway.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[13px] sm:text-[14px] px-2 py-[2px] rounded-lg bg-[#222534] text-[#5BF5FF] flex items-center justify-center leading-none"
                  >
                    {formatSummaryContent(`#${tag}`)}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex gap-[18px]">
                  <FunctionButton
                    iconClassName="w-[18px]"
                    icon={share}
                    onClick={() => handleShare(takeaway)}
                    className="border py-1 px-2 text-[#5BF5FF] text-[12px] border-[#5BF5FF] rounded-[6px]"
                    buttonName="share"
                  />
                  <FunctionButton
                    iconClassName="w-[18px]"
                    icon={copy}
                    onClick={() => handleCopy(takeaway)}
                    className="border py-1 px-2 flex justify-center text-[12px] items-center text-[#5BF5FF] border-[#5BF5FF] rounded-[6px]"
                    buttonName={copyStates[takeaway._id] ? 'copied' : 'copy'}
                  />
                </div>
                <div>
                  <FunctionButton
                    onClick={() => toggleBookmark(takeaway._id)}
                    iconClassName="w-[24px]"
                    icon={bookmarkedTakeaways[takeaway._id] ? takeAwaybluebookmarkfill : takeAwaybluebookmarkunfill}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <LoadingState
          title="AI Magic in Progress"
          subtitle="We're finding your perfect Insights in Events"
        />
      )}
    </div>
  );
};

export default OverviewTakeAway;
