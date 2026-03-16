import { Routes, Route } from "react-router"

import { AppLayout } from "../components/AppLayout"

import { NotFound } from "../pages/NotFound"
import { Transaction } from "../pages/Transaction"
import { Confirm } from "../pages/Confirm"
import { TransactionList } from "../pages/TransactionList"
import { CategoryList } from "../pages/CategoryList"
import { Categories } from "../pages/Categories"
import { UserList } from "../pages/UserList"

export function ManagerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />} >
                <Route path="/" element={<TransactionList />} />
                <Route path="/transaction-register" element={<Transaction />} />
                <Route path="/user" element={<UserList />} />
                <Route path="/category" element={<CategoryList />} />
                <Route path="/category-register" element={<Categories />} />
                <Route path="/confirm" element={<Confirm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}