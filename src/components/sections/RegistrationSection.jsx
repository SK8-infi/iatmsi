import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import RegistrationFeeTable from '../registration/RegistrationFeeTable';



export default function RegistrationSection() {
    return (
        <>
            {/* Page Header */}
            

            {/* Registration Details */}
            <SectionContainer background="white">
                <SectionHeader
                    title="Registration Details"
                    subtitle="Select your participation type and complete your registration"
                />
                <div className="max-w-4xl mx-auto">
                    <RegistrationFeeTable />
                </div>
            </SectionContainer>
        </>
    );
}
