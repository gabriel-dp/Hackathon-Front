import { useState } from "react";
import { UserAuthContainer, AuthContainers, Container, Input, Button } from "./styles";

const SIGNUP_HEADER = (usuario: string, email: string, senha: string) => ({
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ usuario, email, senha }),
});

const SIGNIN_HEADER = (usuario: string, senha: string) => ({
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ usuario, senha }),
});

type FetchStatus = "idle" | "loading" | "success" | "error";

interface UserAuthI {
	handleChangeToken: (newToken: string) => void;
}

export default function UserAuth(props: UserAuthI) {
	const [isSignUp, setIsSignUp] = useState(true);
	const [status, setStatus] = useState<FetchStatus>("idle");

	const toggleSign = () => setIsSignUp((isSignUp) => !isSignUp);

	const [formData, setFormData] = useState({ username: "", email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const url = isSignUp ? import.meta.env.VITE_AUTH_URL + "register" : import.meta.env.VITE_AUTH_URL + "login";
		fetch(
			url,
			isSignUp
				? SIGNUP_HEADER(formData.username, formData.email, formData.password)
				: SIGNIN_HEADER(formData.username, formData.password)
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Request failed with status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				props.handleChangeToken(data.token);
				setStatus("success");
			})
			.catch((error) => {
				console.log(error);
				setStatus("error");
			});
	};

	return (
		<UserAuthContainer>
			<AuthContainers>
				{isSignUp ? (
					<Container>
						<h2>Sign Up</h2>
						<form onSubmit={handleSubmit}>
							<Input
								type="text"
								name="username"
								placeholder="Username"
								value={formData.username}
								onChange={handleChange}
							/>
							<Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
							<Input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
							/>
							<Button type="submit">Cadastrar</Button>
						</form>
					</Container>
				) : (
					<Container>
						<h2>Sign In</h2>
						<form onSubmit={handleSubmit}>
							<Input
								type="text"
								name="username"
								placeholder="Usuário"
								value={formData.username}
								onChange={handleChange}
							/>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
							/>
							<Button type="submit">Login</Button>
						</form>
					</Container>
				)}
			</AuthContainers>
			{status == "error" && <p>Credenciais inválidas</p>}
			<Button onClick={toggleSign}>{isSignUp ? "Já tenho uma conta" : "Não tenho uma conta"}</Button>
		</UserAuthContainer>
	);
}

