import { feeStructure, registrationNotes, registrationProcess } from '../../data/registrationData';

export default function RegistrationFeeTable() {
    return (
        <div className="space-y-8">
            {/* Fee Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-[#003366]">
                    <thead>
                        {/* Header Row 1 */}
                        <tr>
                            <th colSpan="5" className="border border-[#003366] p-3 text-center font-bold text-base bg-primary-900 text-white">
                                Registration Charges
                            </th>
                        </tr>
                        {/* Header Row 2 */}
                        <tr>
                            <th rowSpan="2" className="border border-[#003366] p-3 text-center font-bold bg-primary-800 text-white">
                                Author&apos;s Category
                            </th>
                            <th colSpan="2" className="border border-[#003366] p-3 text-center font-bold bg-primary-800 text-white">
                                Early Bird
                            </th>
                            <th colSpan="2" className="border border-[#003366] p-3 text-center font-bold bg-primary-800 text-white">
                                Regular
                            </th>
                        </tr>
                        {/* Header Row 3 */}
                        <tr>
                            <th className="border border-[#003366] p-3 text-center font-bold text-sm bg-primary-700 text-white">Indian (INR)</th>
                            <th className="border border-[#003366] p-3 text-center font-bold text-sm bg-primary-700 text-white">Foreign (USD)</th>
                            <th className="border border-[#003366] p-3 text-center font-bold text-sm bg-primary-700 text-white">Indian (INR)</th>
                            <th className="border border-[#003366] p-3 text-center font-bold text-sm bg-primary-700 text-white">Foreign (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feeStructure.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                                <td className="border border-[#003366] p-4 font-semibold text-neutral-900 text-sm">
                                    {row.category}
                                </td>
                                <td className="border border-[#003366] p-4 text-center font-bold text-neutral-800">{row.earlyBirdIndian}</td>
                                <td className="border border-[#003366] p-4 text-center font-bold text-neutral-800">{row.earlyBirdForeign}</td>
                                <td className="border border-[#003366] p-4 text-center font-bold text-neutral-800">{row.regularIndian}</td>
                                <td className="border border-[#003366] p-4 text-center font-bold text-neutral-800">{row.regularForeign}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Notes */}
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-6">
                <h3 className="text-xl font-bold font-semibold text-neutral-900 mb-3">Important Notes</h3>
                <ul className="space-y-2">
                    {registrationNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                            {note}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Registration Instructions */}
            <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold font-bold text-neutral-900 mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </span>
                    Registration Process
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {registrationProcess.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Connector line for desktop */}
                            {index < registrationProcess.length - 1 && (
                                <div className="hidden lg:block absolute top-6 left-[60%] w-full h-[2px] bg-gray-100">
                                    <div className="h-full bg-primary-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            )}

                            <div className="relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all z-10">
                                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                </div>
                                <div className="text-xs font-bold text-primary-600 mb-2 tracking-wider">STEP {String(item.step).padStart(2, '0')}</div>
                                <h4 className="text-lg font-bold font-bold text-neutral-900 mb-2">{item.title}</h4>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
