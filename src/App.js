import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Link,
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

function App() {
    return (
        <Router>
            <div className="container trida d-flex flex-column min-vh-100 shadow p-2 my-2 rounded">
                <nav className="navbar navbar-expand shadow p-1 mb-1 bg-light rounded">
                    <ul className="navbar-nav mr-auto gap-1 ">
                    <li className="nav-item">
                            <Link to={"/introduction"} className="nav-link btn btn-secondary text-white">
                                Informace
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/people"} className="nav-link btn btn-primary text-white">
                                Osoby
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={"/invoices"} className="nav-link btn btn-primary text-white">
                                Faktury
                            </Link>
                        </li>
                        <li className="nav-item  my-primary rounded">
                            <Link to={"/statistic"} className="nav-link btn btn-primary text-white">
                                Statistiky
                            </Link>
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
