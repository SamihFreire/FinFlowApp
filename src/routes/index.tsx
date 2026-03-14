import { BrowserRouter } from "react-router"

import { ManagerRoutes } from "./ManagerRoutes"
import { AuthRoutes } from "./AuthRoutes"

export function Routes() {
    return (
        <BrowserRouter>
            <ManagerRoutes />
            {/* <AuthRoutes /> */}
        </BrowserRouter>
    )
}