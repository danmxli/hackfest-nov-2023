'use client'
import { useState, useEffect, useRef } from "react"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TopProfile from "@/components/userinfo/TopProfile";

export default withPageAuthRequired(function User({ user }) {
    return(
        <div className="grid items-center justify-center w-screen h-screen">
            <TopProfile user={user} />
            
        </div>
    )
})

