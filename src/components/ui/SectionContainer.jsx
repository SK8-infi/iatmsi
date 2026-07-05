export default function SectionContainer({
    children,
    className = '',
    background = 'white',
    id,
}) {
    const backgrounds = {
        white: 'bg-white',
        light: 'bg-neutral-50',
        primary: 'bg-primary-50',
        dark: 'text-white',
    };

    const style = background === 'dark' ? { backgroundColor: '#002855' } : {};

    return (
        <section id={id} className={`py-8 md:py-12 ${background === 'dark' ? 'bg-[#002855] text-white' : ''} ${background === 'primary' ? 'bg-primary-50' : ''} ${className}`} style={style}>
            {background === 'white' || background === 'light' ? (
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-100 rounded-[2.5rem] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 p-8 md:p-14">
                        {children}
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            )}
        </section>
    );
}

export function SectionHeader({
    title,
    subtitle,
    centered = true,
    className = '',
}) {
    return (
        <div className={`mb-8 md:mb-10 ${centered ? 'text-center' : ''} ${className}`}>
            <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900 mb-3 md:mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
