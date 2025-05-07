'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Card from '../components/card/index';
import FooterNav from '../components/Navbar/footerNav';
import transparent from '../app/assets/Icons/transparent.svg';
import BannerImage from '../components/BannerImage/page';
import LoadingState from '../components/LoadingState';

// Mock data to replace API calls
const MOCK_DATA = {
  eventId: 'event123',
  bannerData: {
    banner: '/images/banner.jpg',
    title: 'KEDDA EXPO'
  },
  sessions: [
    {
      _id: 'session1',
      title: 'Welcome to KEDDA EXPO',
      description: 'Opening ceremony and introduction to the event',
      startTime: '2025-05-06T09:00:00',
      endTime: '2025-05-06T10:00:00',
      location: 'Main Hall',
      stage: {
        stage: 'Main Stage'
      },
      speakers: [
        { 
          _id: 'speaker1',
          name: 'John Doe', 
          role: 'CEO', 
          company: 'TechCorp',
          photo: '/images/speaker1.jpg'
        }
      ],
      event: {
        _id: 'event123'
      }
    },
    {
      _id: 'session2',
      title: 'Future of Technology',
      description: 'Exploring emerging trends in tech industry',
      startTime: '2025-05-06T11:00:00',
      endTime: '2025-05-06T12:30:00',
      location: 'Innovation Lab',
      stage: {
        stage: 'Innovation Stage'
      },
      speakers: [
        { 
          _id: 'speaker2',
          name: 'Jane Smith', 
          role: 'CTO', 
          company: 'FutureTech',
          photo: '/images/speaker2.jpg'
        }
      ],
      event: {
        _id: 'event123'
      }
    },
    {
      _id: 'session3',
      title: 'Networking Lunch',
      description: 'Connect with industry professionals',
      startTime: '2025-05-06T13:00:00',
      endTime: '2025-05-06T14:00:00',
      location: 'Dining Area',
      stage: {
        stage: 'Dining Area'
      },
      speakers: [],
      event: {
        _id: 'event123'
      }
    }
  ],
  recapSettings: {
    success: true,
    response: [
      { enableLogin: true }
    ]
  },
  isAuthenticated: true
};

export default function HomeUI() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState(null);
  const [eventId, setEventId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  // Simulate loading event data
  useEffect(() => {
    const loadEventData = () => {
      // Simulate API loading time
      setTimeout(() => {
        setEventId(MOCK_DATA.eventId);
        setBannerData(MOCK_DATA.bannerData);
        setLoading(false);
      }, 500);
    };
    
    loadEventData();
  }, []);

  // Simulate loading sessions
  useEffect(() => {
    const loadSessions = () => {
      if (!eventId) return;
      
      // Simulate API loading time
      setTimeout(() => {
        setSessions(MOCK_DATA.sessions);
      }, 300);
    };
    
    loadSessions();
  }, [eventId]);

  // Simulate authentication check
  useEffect(() => {
    const checkLoginRequired = () => {
      if (!eventId) return;
      
      const { recapSettings, isAuthenticated } = MOCK_DATA;
      
      if (recapSettings.success && recapSettings.response[0]?.enableLogin) {
        if (!isAuthenticated) {
            router.push('/login');
        }
      }
    };
    
    checkLoginRequired();
  }, [eventId, router]);

  if (loading) {
    return (
      <LoadingState
        title="Loading Home"
        subtitle="We're finding your sessions"
      />
    );
  }

  return (
    <Provider store={store}>
      <div className="bg-gray-900 h-screen flex flex-col justify-between">
        <div className="bg-gray-900 text-white">
          {/* Header */}
          <header className="pb-4 pt-3 flex items-center justify-between bg-grey-900 px-4">
            <div className="flex items-center space-x-2">
              
              <div className="w-8 h-8 rounded-full bg-gray-600 border-[1px] border-solid">
                <Image src={transparent} alt="Profile" />
              </div>
              <div className="">
                <p className="text-[12px] font-inter font-extralight leading-4">
                  Welcome Back
                </p>
                <h1 className=" text-gray-300 font-inter font-semibold leading-[1.21]">
                  Ahmed Zidane ! 🤟🏻
                </h1>
              </div>
            </div>
          </header>
          
          {/* Banner */}
          <div className="px-4">
            {bannerData?.banner && (
              <BannerImage
                banner={bannerData.banner}
                title={bannerData.title || "KEDDA EXPO"}
                className="w-full md:h-40 lg:h-48"
              />
            )}
          </div>
          
          {/* <div>
            <p className="p-4 font-[500] text-[16px] font-inter">
              Latest 
            </p>
          </div> */}
          
          {/* Event List */}
          {sessions.map((session) => (
            <Card key={session._id} session={session} />
          ))}
        </div>
        
        {/* Bottom Navigation */}
        <FooterNav />
      </div>
    </Provider>
  );
}