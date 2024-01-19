'use client'

import React, { useState, useEffect } from 'react';
import SpaceHeaderTab from './SpaceHeaderTab';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/app/hooks/useStore';
import { navigate } from '@/app/utils/actions';
import SpaceLogo from '../space-logo/SpaceLogo';

interface Tab {
    text: string
    destination: string
    action?: () => void
    iconSrc: string
    iconAlt: string
    iconSize: string
}

const HEADER_TABS_SIGNEDIN: Tab[] = [
    {
        text: 'Home',
        destination: '/',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '16'
    },
    {
        text: 'Account',
        destination: '/account',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '16'
    },
    {
        text: 'Settings',
        destination: '/settings',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '16'
    },
    {
        text: 'Sign out',
        destination: '/logout',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '16',
        action: () => {
            navigate('/')
        }
    }
];

const HEADER_TABS_SIGNEDOUT: Tab[] = [
    {
        text: 'Home',
        destination: '/',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '24'
    },
    {
        text: 'Sign in',
        destination: '/login',
        iconSrc: '/space-home.png',
        iconAlt: 'home',
        iconSize: '16'
    },
    {
        text: 'Sign up',
        destination: '/register',
        iconSrc: '/space-sign-up.png',
        iconAlt: 'home',
        iconSize: '16'
    },
];
const SpaceHeader = () => {
    const [expandedNavItem, setExpandedNavItem] = useState('');
    const pathname = usePathname();

    const { user } = useUserStore();

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
                        {
                            user ? HEADER_TABS_SIGNEDIN.map((tab, index) => {
                                return (
                                    <SpaceHeaderTab
                                        key={index}
                                        text={tab.text}
                                        destination={tab.destination}
                                        expanded={expandedNavItem === tab.text}
                                        handleNavItemClick={handleNavItemClick}
                                        action={tab.action}
                                        icon={
                                            <SpaceLogo
                                                src={tab.iconSrc}
                                                alt={tab.iconAlt}
                                                size={tab.iconSize}
                                                classes={expandedNavItem === tab.text ? '' : 'opacity-75'}
                                            />
                                        }
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
                                        icon={
                                            <SpaceLogo
                                                src={tab.iconSrc}
                                                alt={tab.iconAlt}
                                                size={tab.iconSize}
                                                classes={expandedNavItem === tab.text ? '' : 'opacity-75'}
                                            />
                                        }
                                    />
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default SpaceHeader;