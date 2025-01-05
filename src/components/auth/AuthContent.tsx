import { useState } from "react";
import { Link } from 'react-router-dom';

// UI
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import LoadingState from "../ui/LoadingState";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast"

// ICONS
import { FcKey } from "react-icons/fc";

// SERVICES
import { login } from "@/backend/services/auth/login";

// STORES
import useIsUserLoggedInState from "@/stores/backend/useIsLoggedinState";

export default function AuthContent() {

    const { toast } = useToast()

    // Collect access values
    const [accessValues, setAccessValues] = useState<{ email: string; password: string; }>({
        email: '',
        password: ''
    });

    // Loading State
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Update isUserLoggedinState
    const { setIsUserLoggedIn } = useIsUserLoggedInState();

    // Handle Access
    async function handleAccess() {

        // Run loading state
        setIsLoading(true)

        // Send access values to Login function
        await login(accessValues)
            .then((res) => {
                if (res) {
                    setIsUserLoggedIn(true)
                    setIsLoading(false)
                } else {
                    setIsUserLoggedIn(false)
                    toast({
                        title: "Oops! Incorrect Credentials",
                        description: "It looks like the email or password you entered doesn't match our records. Please double-check your credentials and try again. If you continue to have trouble, feel free to reach out for assistance. We're here to help!",
                        variant: "destructive"
                      })
                    setIsLoading(false)
                }
            })
    }

    return (
        <div className="flex h-screen">

            {/* Left side - Media Banner */}
            <div className="hidden lg:block lg:w-1/2 relative">
                {/* Video Mask */}
                <div className="object-cover w-full h-full absolute z-20"></div>
                <video muted autoPlay loop className="object-cover h-full w-full z-10" src="assets/loginBanner.mp4"></video>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16">
                <div className="flex-grow flex flex-col justify-center items-center">
                    {/* Company Logo */}
                    <div className="mb-8">
                        <img
                            src="assets/companyLogo.png"
                            alt="Company Logo"
                            width={150}
                        />
                    </div>

                    {/* Login Form */}
                    <form className="w-full max-w-sm space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">SignCast's Employee Email</Label>
                            <Input autoComplete="false" autoSave="false" autoCorrect="false" autoFocus className="bg-white text-sm" onChange={(e) => setAccessValues({ ...accessValues, email: e.target.value })} id="email" type="email" placeholder="example@signcast.ca" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Company Password</Label>
                            <Input className="bg-white text-sm" onChange={(e) => setAccessValues({ ...accessValues, password: e.target.value })} id="password" type="password" placeholder="Enter your company password" required />
                        </div>
                        <Button type="button" onClick={handleAccess} disabled={isLoading || accessValues.email.trim().length === 0 || accessValues.password.trim().length === 0} className="w-full">
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <LoadingState setWidth="25" />
                                    <span>Checking your identity..</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <FcKey />
                                    <span>Access Workspace</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    <Separator className="w-[200px] mt-20" />

                    {/* Access Problems Link */}
                    <Link to="#" className="mt-4 text-sm text-blue-600 hover:underline">
                        Having trouble accessing with your credentials?
                    </Link>
                </div>

            </div>
        </div>
    )
}

