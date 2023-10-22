import styled from "styled-components";

export const UserAuthContainer = styled.div`
	width: 100%;
	height: 100dvh;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const AuthContainers = styled.div`
	width: min(100%, 30rem);
`;

export const Container = styled.div`
	padding: 1.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	form {
		gap: 0.5rem;
		display: flex;
		flex-direction: column;
	}
`;

export const Input = styled.input`
	padding: 0.75rem 1rem;
	border: 1px solid ${(props) => props.theme.gray};
	border-radius: 0.5rem;
`;

export const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: ${(props) => props.theme.primary};
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

