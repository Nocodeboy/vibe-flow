// Shared Types for the Portfolio Project
import { ReactNode } from 'react';

export interface Project {
    id: string;
    title: string;
    category: string;
    img: string;
    width?: string;
    className?: string;
    description: string;
    tags: string[];
    fromWork?: boolean;
    // Detail View Fields
    challenge?: string;
    solution?: string;
    impact?: string[];
    link?: string;
    devTime?: string;
    service?: string;
}

export interface Service {
    id: string;
    icon: ReactNode;
    title: string;
    desc: string;
    tags: string[];
    img: string;
    color: string;
}

export interface Review {
    text: string;
    author: string;
    pos: string;
    stat: string;
    metric: string;
}

export type ViewType = 'home' | 'work' | 'detail';

export type BackgroundTheme = 'nebula' | 'cyber' | 'void' | 'warm' | 'default';
