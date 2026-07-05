import { Link } from 'react-router-dom';
import { homeIntroContent, conferenceInfo } from '../../data/conferenceData';
import { ROUTES } from '../../constants/routes';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import Button from '../ui/Button';

export default function IntroSection() {
    return (
        <SectionContainer background="white" className="relative overflow-hidden">

            {/* Intro Content & Poster Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20 max-w-7xl mx-auto relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-7 xl:col-span-8 text-left space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900">
                            {`Welcome to ${conferenceInfo.shortTitle}`}
                        </h2>
                        <p className="text-sm md:text-base text-neutral-600">
                            {conferenceInfo.fullTitle}
                        </p>
                        <div className="w-16 h-1 bg-primary-600 rounded-full mt-4" />
                    </div>

                    <div className="prose text-neutral-600 text-justify max-w-none">
                        <p className="leading-relaxed text-sm sm:text-base text-neutral-700">
                            {homeIntroContent.mainIntro}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4 justify-start">
                        <Button to={ROUTES.TRACKS} variant="primary" size="md" className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Call for Papers
                        </Button>
                        <Button to={ROUTES.ABOUT} variant="outline" size="md" className="hover:bg-primary-50">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right: Conference Info Card */}
                <div className="lg:col-span-5 xl:col-span-4 relative flex justify-center lg:justify-end">
                    <div className="relative max-w-[360px] w-full">
                        {/* Decorative background */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-[2rem] opacity-60" />
                        <div className="absolute -inset-2 bg-white/40 rounded-[2rem] backdrop-blur-sm" />

                        <div className="relative rounded-2xl shadow-xl border border-white/50 bg-white overflow-hidden">
                            <div className="bg-primary-900 p-5 text-white">
                                <h3 className="text-xl font-bold font-bold !text-white mb-1.5">{conferenceInfo.shortTitle}</h3>
                                <p className="text-xs !text-white opacity-90 leading-relaxed">{conferenceInfo.fullTitle}</p>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-wide font-semibold">Dates</p>
                                        <p className="text-xs font-bold text-neutral-900">{conferenceInfo.dates}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-wide font-semibold">Venue</p>
                                        <p className="text-xs font-bold text-neutral-900">{conferenceInfo.venue.shortName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase tracking-wide font-semibold">Mode</p>
                                        <p className="text-xs font-bold text-neutral-900">{conferenceInfo.mode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
