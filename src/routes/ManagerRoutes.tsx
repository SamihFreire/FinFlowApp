import { Routes, Route } from "react-router"

import { AppLayout } from "../components/AppLayout"

import { NotFound } from "../pages/NotFound"
import { Transaction } from "../pages/Transaction"

export function ManagerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />} >
                <Route path="/" element={<Transaction />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}