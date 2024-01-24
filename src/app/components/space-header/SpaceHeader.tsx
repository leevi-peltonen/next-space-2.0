'use client'

import React, { useState, useEffect } from 'react';
import SpaceHeaderTab from './SpaceHeaderTab';
import { usePathname } from 'next/navigation';
import { useStore } from '@/app/hooks/useStore';
import { navigate } from '@/app/utils/actions';


interface Tab {
    text: string
    destination: string
    action?: () => void
}

const HEADER_TABS_SIGNEDIN: Tab[] = [
    {
        text: 'Home',
        destination: '/',

    },
    {
        text: 'Characters',
        destination: '/character',

    },
    {
        text: 'Settings',
        destination: '/settings',

    },
    {
        text: 'Sign out',
        destination: '/logout',

        action: () => {
            navigate('/')
        }
    }
];

const HEADER_TABS_SIGNEDOUT: Tab[] = [
    {
        text: 'Home',
        destination: '/',

    },
    {
        text: 'Sign in',
        destination: '/login',

    },
    {
        text: 'Sign up',
        destination: '/register',

    },
];
const SpaceHeader = () => {
    const [expandedNavItem, setExpandedNavItem] = useState('');
    const pathname = usePathname();

    const { user } = useStore();

    const handleNavItemClick = (navItem: string) => {
        if(navItem === expandedNavItem) return;
        setExpandedNavItem(navItem === expandedNavItem ? '' : navItem);
    };

    useEffect(() => {
        user ? setExpandedNavItem(HEADER_TABS_SIGNEDIN.find(tab => tab.destination === pathname)?.text || '') :
        setExpandedNavItem(HEADER_TABS_SIGNEDOUT.find(tab => tab.destination === pathname)?.text || '');
    },[pathname])

    return (
        <header className="bg-background rounded-xl py-4">
            <div className="container mx-auto flex items-center justify-between p-4 h-20">
                <nav className="flex-grow h-full">
                    <ul className="flex justify-center">
                        {/*
                            user ? HEADER_TABS_SIGNEDIN.map((tab, index) => {
                                return (
                                    <SpaceHeaderTab
                                        key={index}
                                        text={tab.text}
                                        destination={tab.destination}
                                        expanded={expandedNavItem === tab.text}
                                        handleNavItemClick={handleNavItemClick}
                                        action={tab.action}
                                    />
                                )
                            }) : HEADER_TABS_SIGNEDOUT.map((tab, index) => {
                                return (
                                    <SpaceHeaderTab
                                        key={index}
                                        text={tab.text}
                                        destination={tab.destination}
                                        expanded={expandedNavItem === tab.text}
                                        handleNavItemClick={handleNavItemClick}
                                    />
                                )
                            })
                        */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default SpaceHeader;