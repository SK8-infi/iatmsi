import { reviewerInfo } from '../../data/reviewerData';
import { siteConfig } from '../../data/siteConfig';

export default function CallForReviewersSection() {
    return (
        <div className="bg-neutral-50 pb-16 min-h-screen">
            {/* Page Header */}
            

            <section className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="bg-[#002855] px-6 py-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Call for Reviewers</h2>
                            <p className="text-blue-100 text-base">({reviewerInfo.intro})</p>
                        </div>
                        
                        <div className="px-6 py-8 sm:p-10">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Who can apply?</h3>
                                        <p className="text-neutral-600 text-base leading-relaxed">
                                            {reviewerInfo.whoCanApply.join(' ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Benefits and Recognition</h3>
                                        <p className="text-neutral-600 text-base leading-relaxed">
                                            {reviewerInfo.benefits.join(' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="my-8 border-neutral-100" />
                            
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-bold font-bold text-neutral-900 mb-4 flex items-center justify-center gap-2">
                                   <span className="text-base">👉</span> Apply via {siteConfig.externalLinks.reviewerForm.name}
                                </h3>
                                <a 
                                    href={siteConfig.externalLinks.reviewerForm.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent rounded-lg shadow-md text-base font-bold !text-white bg-[#e63946] hover:bg-[#d62828] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e63946] transition-all transform hover:scale-105 w-full sm:w-auto text-center"
                                >
                                    Submit Application Here
                                </a>
                                <p className="mt-4 text-sm text-neutral-500 font-medium break-all">
                                    {siteConfig.externalLinks.reviewerForm.url}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
