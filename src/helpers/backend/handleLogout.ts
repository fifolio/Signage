import { logout } from "@/backend/services/auth/logout";

   // handle Logout func.
    async function handleLogout() {
        // setLogoutSpinner(true)
        const res = await logout();
        if (res) {
            // navigate to home page
            window.location.href = '/';
        } else {
            console.log('Can not logout! something went wrong while logging out!, Please reload the page and try again.');
        }
    }

    export default handleLogout;