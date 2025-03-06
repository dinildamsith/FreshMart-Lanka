import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import {AppProvider} from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <AppProvider>
            <AppWrapper>
                <App />
            </AppWrapper>
        </AppProvider>
    </ThemeProvider>
);
