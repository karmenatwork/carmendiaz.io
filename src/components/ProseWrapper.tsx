import clsx from 'clsx';

interface ProseWrapperProps {
    className?: string;
    children: React.ReactNode;
}

function ProseWrapper({ className, children }: React.ComponentPropsWithoutRef<'div'> & ProseWrapperProps) {
    const wrapperClasses = clsx('prose', className);

    return (
        <div className={wrapperClasses}>
            {children}
        </div>
    );
}

export default ProseWrapper;


