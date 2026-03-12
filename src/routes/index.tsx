import { BrowserRouter } from "react-router"

import { ManagerRoutes } from "./ManagerRoutes"

export function Routes() {
    return (
        <BrowserRouter>
            <ManagerRoutes />
        </BrowserRouter>
    )
}