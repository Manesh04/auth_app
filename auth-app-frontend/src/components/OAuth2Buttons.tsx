import React from 'react'
import { Button } from './ui/button'
import { Github, Mail } from 'lucide-react'
import { NavLink } from 'react-router'

function OAuth2Buttons() {
    return (
        // {/* OAuth Buttons */}
        <div className="grid grid-cols-1 gap-3">
            <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8083"
                }/oauth2/authorization/google`}>
                <Button type='button' variant="outline" className="w-full gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    Continue with Google
                </Button>
            </NavLink>

            <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8083"
                }/oauth2/authorization/github`}>
                <Button type='button' variant="outline" className="w-full gap-2 cursor-pointer">
                    <Github className="h-4 w-4" />
                    Continue with GitHub
                </Button>
            </NavLink>
        </div>
    )
}

export default OAuth2Buttons