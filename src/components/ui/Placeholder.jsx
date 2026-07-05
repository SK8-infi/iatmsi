/**
 * Placeholder component for images and assets
 * Use this for hero images, logos, QR codes, etc.
 * Images can be passed via src prop when available
 */
export default function Placeholder({
    label = 'Image Placeholder',
    aspectRatio = '16/9',
    className = '',
    src = null,
    alt = '',
}) {
    if (src) {
        return (
            <img
                src={src}
                alt={alt || label}
                className={`w-full h-full object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`
        w-full placeholder flex flex-col items-center justify-center gap-2
        ${className}
      `}
            style={{ aspectRatio }}
        >
            <svg
                className="w-12 h-12 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            <span className="text-xs font-medium text-neutral-500">{label}</span>
        </div>
    );
}

export function LogoPlaceholder({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    };

    return (
        <div
            className={`
        ${sizes[size]} placeholder flex items-center justify-center text-xs
        ${className}
      `}
        >
            LOGO
        </div>
    );
}

export function QRCodePlaceholder({ className = '' }) {
    return (
        <div
            className={`
        w-32 h-32 placeholder flex flex-col items-center justify-center gap-1
        ${className}
      `}
        >
            <svg
                className="w-8 h-8 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
            </svg>
            <span className="text-xs">QR CODE</span>
        </div>
    );
}
