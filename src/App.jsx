import { Routes, Router, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Create from "./pages/create";
import { useEffect } from "react";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //reducer'a yüklemenin başladığını haber verdik
    dispatch(setLoading());
    //api isteği attık
    api
      .get("/jobs")
      //başarılı olursa reducer a başarılı olduğunu haber veriyoruz
      .then((res) => dispatch(setJobs(res.data)))
      //başarısız olursa reducer a hata olduğunu haber veriyoruz
      .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
