'use client';

import Menu from "../../../components/menu/Menu";
import {
  Bookunmark,
  NoTakeAway,
  Sparkle,
  takeAwaybluebookmarkfill,
  takeAwayblueheart,
  takeAwayblueshare,
  takeawaydetail,
  takewaycard,
  takewaypin,
  copy,
  share,
  DetailBlack,
  Cardblue,
} from "../../../app/assets";
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
import MenuButton from "../../../components/share-copy-download-button/MenuButton";
import LoadingState from "../../../components/LoadingState";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TakeAwayDetailed = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentSession = useSelector(selectCurrentSession);
  const currentAudio = useSelector(selectCurrentAudio);
  const sessionId = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : '';

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) return;
      dispatch(setLoading(true));
      try {
        // Mock data to maintain existing design
        const mockData = {
          success: true,
          audio: {
            session: {
              id: sessionId,
            },
            summaries: {
              detailedKeytakeaway: [
                "1. First detailed takeaway point with explanation",
                "2. Second detailed takeaway point with explanation",
                "3. Third detailed takeaway point with explanation"
              ]
            },
            fullSummary: "Complete summary of the session..."
          }
        };
        
        dispatch(setCurrentAudio(mockData.audio));
        dispatch(setReduxCurrentSession(mockData.audio.session));
      } catch (error) {
        console.error("Error handling session details:", error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSessionDetails();
  }, [dispatch, sessionId]);

  const [Data, setData] = useState(null);

  useEffect(() => {
    if (currentAudio) {
      setData(currentAudio);
    }
  }, [currentAudio]);

  if (!currentAudio) {
    return (
      <LoadingState
        title="Loading Take Away"
        subtitle="We're finding your insights"
      />
    );
  }

  return (
    <div className="bg-[#10131A] text-white p-4 font-inter  sm:p-6 lg:p-8">
      <Menu />

      {/* Header Section */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-1">
          <img
            src={takewaypin}
            alt="overviewList"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
          <h2 className="font-inter font-medium text-[14px]  text-[#FFFFFF]">
            Take Away
          </h2>
        </div>
        <div className="flex justify-center py-1 px-1 items-center w-38 bg-[#282C3A] rounded-lg overflow-hidden">
          <Link href={`/${sessionId}/takeaway`} className="flex-1">
            <div className="flex items-center justify-center border-0 bg-[#222534] text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2">
              <img
                src={Cardblue}
                alt="Card"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[13px] ">Card</button>
            </div>
          </Link>
          <Link href={`/${sessionId}/detailed`} className="flex-1">
            <div className="flex items-center justify-center border-0 text-[#222534] bg-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md">
              <img
                src={DetailBlack}
                alt="Detail"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[13px] sm:text-[14px] font-bold">
                Detail
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Session Summary */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#282C3A] rounded-lg p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="text-gray-300 space-y-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
            {currentAudio?.summaries?.detailedKeytakeaway && (
              <div className="leading-relaxed font-inter space-y-3">
                <ol className="pl-5 text-[14px] space-y-3">
                  {formatSummaryContent(currentAudio.summaries.detailedKeytakeaway.join('\n\n'))}
                </ol>
              </div>
            )}
          </div>

          <MenuButton
            img1={share}
            img1Text={"Share"}
            img2={copy}
            img2Text={"Copy"}
            copyText={currentAudio.fullSummary}
          />
        </div>
      </div>
    </div>
  );
};

export default TakeAwayDetailed;
