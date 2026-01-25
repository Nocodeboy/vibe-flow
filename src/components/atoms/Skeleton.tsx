
import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    rounded?: 'sm' | 'md' | 'lg' | 'full' | '2xl' | '3xl';
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    rounded = 'lg'
}) => {
    const roundedClass = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl'
    }[rounded];

    return (
        <motion.div
            className={`bg-white/5 ${roundedClass} overflow-hidden relative ${className}`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                    x: ['-100%', '100%']
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
        </motion.div>
    );
};

// Page Loading Skeleton
export const PageSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Skeleton */}
                <div className="text-center mb-20">
                    <Skeleton className="w-32 h-6 mx-auto mb-6" rounded="full" />
                    <Skeleton className="w-3/4 h-16 md:h-24 mx-auto mb-4" rounded="lg" />
                    <Skeleton className="w-1/2 h-16 md:h-24 mx-auto mb-8" rounded="lg" />
                    <Skeleton className="w-2/3 h-6 mx-auto" rounded="lg" />
                </div>

                {/* Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-[16/10] w-full" rounded="3xl" />
                            <Skeleton className="w-1/4 h-4" rounded="full" />
                            <Skeleton className="w-3/4 h-8" rounded="lg" />
                            <Skeleton className="w-full h-16" rounded="lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Blog Post Skeleton
export const PostSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 px-6">
            <div className="max-w-4xl mx-auto">
                <Skeleton className="w-24 h-4 mb-4" rounded="full" />
                <Skeleton className="w-20 h-6 mb-8" rounded="full" />
                <Skeleton className="w-full h-12 md:h-16 mb-4" rounded="lg" />
                <Skeleton className="w-3/4 h-12 md:h-16 mb-8" rounded="lg" />

                <div className="flex items-center gap-4 mb-12">
                    <Skeleton className="w-10 h-10" rounded="full" />
                    <div className="space-y-2">
                        <Skeleton className="w-40 h-4" rounded="lg" />
                        <Skeleton className="w-24 h-3" rounded="lg" />
                    </div>
                </div>

                <Skeleton className="w-full aspect-[16/9] mb-12" rounded="3xl" />

                <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="w-full h-24" rounded="lg" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
