import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import PersonIndex from "./people/PersonIndex";
import PersonDetail from "./people/PersonDetail";
import PersonForm from "./people/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceDetail from "./invoices/InvoiceDetail";
import Statistic from "./statistic/Statistic";
import Introduction from "./introduction/Introduction";
import Footer from "./components/Footer";
import logo from './pictures/logo2.jpg';

function App() {

    const style = "btn btn-light border border-secondary shadow";

    return (
        <Router>
            <div className="container d-flex flex-column shadow p-1 my-2 rounded"
                style={{ minHeight: "calc(100vh - 2rem)" }}
            >
                <nav className="navbar navbar-expand align-items-end shadow p-1 mb-2 rounded"
                    style={{
                        backgroundImage: `url(${logo})`,
                        height: '150px',
                        backgroundSize: '100% 150px',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <ul className="navbar-nav mr-auto gap-1">
                        <li className="nav-item">
                            <NavLink to={"/introduction"} className={style}>
                                Informace
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/people"} className={style}>
                                Osoby
                            </NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to={"/invoices"} className={style}>
                                Faktury
                            </NavLink>
                        </li>
                        <li className="nav-item  my-primary rounded">
                            <NavLink to={"/statistic"} className={style}>
                                Statistiky
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route index element={<Navigate to={"/introduction"} />} />
                    <Route path="/introduction">
                        <Route index element={<Introduction />} />
                    </Route>
                    <Route index element={<Navigate to={"/people"} />} />
                    <Route path="/people">
                        <Route index element={<PersonIndex />} />
                        <Route path="show/:id" element={<PersonDetail />} />
                        <Route path="create" element={<PersonForm />} />
                        <Route path="edit/:id" element={<PersonForm />} />
                    </Route>
                    <Route index element={<Navigate to={"/invoices"} />} />
                    <Route path="/invoices">
                        <Route index element={<InvoiceIndex />} />
                        <Route path="create" element={<InvoiceForm />} />
                        <Route path="show/:id" element={<InvoiceDetail />} />
                        <Route path="edit/:id" element={<InvoiceForm />} />
                    </Route>
                    <Route index element={<Navigate to={"/statistic"} />} />
                    <Route path="/statistic">
                        <Route index element={<Statistic />} />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
