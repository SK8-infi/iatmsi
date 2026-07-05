export default function Card({
    children,
    className = '',
    hover = true,
    padding = 'default',
}) {
    const paddings = {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
        bg-white rounded-xl shadow-[var(--shadow-card)] border border-neutral-100
        ${hover ? 'hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200' : ''}
        ${paddings[padding]}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`text-base font-semibold text-neutral-900 ${className}`}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = '' }) {
    return (
        <p className={`text-sm text-neutral-600 mt-1 ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
