import {
  clockBlack,
  overview,
  overviewCal,
  profile,
  resourceimg,
  rightButton,
  shareBlack,
  social,
  takeAwayIcon,
  overviewBlack,
  summaryBlue,
  overviewList,
} from "../../app/assets";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  selectCurrentAudio,
  selectCurrentSession,
} from "../../store/sessionsSlice";
import Image from "next/image";

const Menu = () => {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId;
  const currentSession = useSelector(selectCurrentSession);
  const currentAudio = useSelector((state) => 
    state.audio.audioData[sessionId]
  )?.data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  if (!currentSession) {
    console.log("no current session")
    return null;
  }

  const { title, day, startTime, endTime } = currentSession;

  const getActiveStyles = (path) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    let isActive = false;

    switch (path) {
      case 'overview':
        isActive = currentPath.includes('/overview') || currentPath.includes('/summary');
        break;
      case 'takeaway':
        isActive = currentPath.includes('/takeaway') || currentPath.includes('/detailed');
        break;
      case 'social':
        isActive = currentPath.includes('/social');
        break;
      case 'resource':
        isActive = currentPath.includes('/resource') || currentPath.includes('/files');
        break;
      default:
        isActive = false;
    }

    return {
      textColor: isActive ? "text-[#FFFFFF]" : "text-[#868C98]",
      indicator: isActive 
        ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#5BF5FF] after:rounded-t-lg after:transition-all after:duration-300"
        : "",
      background: isActive ? "" : ""
    };
  };

  const navigationItems = [
    {
      path: 'overview',
      icon: overview,
      label: 'Overview',
      to: `/${sessionId}/overview`
    },
    {
      path: 'takeaway',
      icon: takeAwayIcon,
      label: 'Take Away',
      to: `/${sessionId}/takeaway`
    },
    {
      path: 'social',
      icon: social,
      label: 'Social',
      to: `/${sessionId}/social/twitter`
    },
    {
      path: 'resource',
      icon: resourceimg,
      label: 'Resources',
      to: `/${sessionId}/resource`
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] rounded-xl px-4">
        <div className="flex items-center py-4 w-full text-[#0A0D14] border-b border-[#FBF9F9]">
          <Link href="/">
            <button className="w-[32px] h-[32px] ml-2 rounded-full bg-[#F6F8FA] flex justify-center items-center">
              <Image src={rightButton} alt="Back" width={16} height={16} />
            </button>
          </Link>
          <h1 className="px-3 font-inter font-medium text-[16px] sm:text-[16px] leading-6">
            {title}
          </h1>
        </div>

        <div className="flex items-center py-1 w-full text-[#0A0D14]">
          {currentSession?.speakers?.length > 0 ? (
            currentSession.speakers.map((speaker, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="w-[48px] h-[48px] ml-2 rounded-full bg-[#F6F8FA] flex justify-center items-center">
                  <Image
                    src={speaker.photo ? `${process.env.NEXT_PUBLIC_IMG_CDN}${speaker.photo}` : profile}
                    alt={speaker.name}
                    width={48}
                    height={48}
                    className="rounded-full w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = profile;
                    }}
                  />
                </div>
                <div className="flex flex-col px-3">
                  <h2 className="font-inter font-medium text-[#0A0D14] text-[16px] sm:text-[14px] leading-[16.94px]">
                    {speaker.name}
                  </h2>
                  <p className="font-inter text-[12px] text-[#525866]">
                    {speaker.designation || "Unknown"},{" "}
                    {speaker.company || "Unknown"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h2 className="px-3 font-inter font-medium text-[#0A0D14] text-[16px] sm:text-[14px] leading-[16.94px]">
              Unknown Speaker
            </h2>
          )}
        </div>

        <div className="pb-4 mt-[0px]">
          <p className="text-[14px] font-inter text-[#0A0D14] leading-[1.5]">
            {currentAudio?.summaries?.oneLineDescription}
          </p>
        </div>

        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center">
            <div className="flex items-center border-black">
              <Image src={overviewCal} alt="Calendar" width={24} height={24} className="p-2" />
              <p className="text-[12px] text-[#0A0D14] font-inter pr-2">
                {formatDate(day?.createdAt)}
              </p>
            </div>
            <hr className="w-[1px] h-[20px] bg-black" />
            <div className="flex items-center">
              <Image src={clockBlack} alt="Clock" width={24} height={24} className="p-2" />
              <p className="text-[10px] sm:text-[12px] font-inter text-[#0A0D14]">
                {startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)}` : ''}
              </p>
            </div>
          </div>
          <div>
            <Image src={shareBlack} alt="Share" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around pt-4 relative">
        {navigationItems.map(({ path, icon, label, to }) => (
          <Link href={to} className="w-1/4" key={path}>
            <div className={`flex items-center flex-col justify-center py-4 relative ${getActiveStyles(path).background} rounded-t-lg transition-all duration-300`}>
              <Image
                src={icon}
                alt={label}
                width={24}
                height={24}
                className="w-[24px] h-[24px] sm:w-[36px] sm:h-[36px] mb-2"
              />
              <p className={`${getActiveStyles(path).textColor} text-[12px] sm:text-[14px] relative ${getActiveStyles(path).indicator}`}>
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;