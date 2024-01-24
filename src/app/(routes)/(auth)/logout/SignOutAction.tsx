"use client"

import { useEffect, useRef } from 'react'

export default function SignOutAction({ deleteTokens }: { deleteTokens: () => void }){
    const deleteTokensRef = useRef(deleteTokens);
  
    useEffect(() => {
      deleteTokensRef.current = deleteTokens;
    });
  
    useEffect(() => {
      deleteTokensRef.current();
    }, []);
  
    return null;
  }