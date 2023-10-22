import useLocalStorage from "@/hooks/useLocalStorage";

import UserAuth from "./UserAuth";
import UserProfile from "./UserProfile";

export default function User() {
	const [auth, setAuth] = useLocalStorage("auth", { token: null });

	const handleChangeToken = (newToken: string) => {
		setAuth({ token: newToken });
	};

	const logout = () => setAuth({ token: null });

	if (auth.token == null) {
		return <UserAuth handleChangeToken={handleChangeToken} />;
	} else {
		return <UserProfile token={auth.token} logout={logout} />;
	}
}

