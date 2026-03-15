import { Routes, Route } from "react-router"

import { AppLayout } from "../components/AppLayout"

import { NotFound } from "../pages/NotFound"
import { Transaction } from "../pages/Transaction"
import { Confirm } from "../pages/Confirm"
import { Dashboard } from "../pages/Dashboard"

export function ManagerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/transaction-register" element={<Transaction />} />
                <Route path="/confirm" element={<Confirm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}