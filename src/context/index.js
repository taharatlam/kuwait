import { UserProvider } from "./UserContext";
import { GlobalDataProvider } from "./GlobalDataContext";

export function AppProvider({ children }) {
  return (
    <UserProvider>
      <GlobalDataProvider>{children}</GlobalDataProvider>
    </UserProvider>
  );
}
