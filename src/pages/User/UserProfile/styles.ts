import styled from "styled-components";

export const UserContainer = styled.div`
	width: 100%;
	height: 100dvh;
	overflow-y: scroll;
	padding: 2rem 0;

	display: flex;
	flex-direction: column;
	align-items: center;

	.content {
		height: 100%;
		width: min(100%, 50rem);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.welcome {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.title {
		font-weight: bold;
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.text {
		margin-bottom: 1rem;
	}
`;

export const UserData = styled.div``;

export const AchievmentsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

interface AchievmentCardI {
	$state: string;
}

export const AchievmentCard = styled.div<AchievmentCardI>`
	width: 100%;
	min-height: 5rem;
	text-decoration: ${(props) => (props.$state == "used" ? "line-through" : "none")};
	color: ${(props) => props.theme.primaryText};
	border-radius: 1rem;
	overflow: hidden;
	opacity: ${(props) => (props.$state == "used" ? "0.5" : "1")};

	display: flex;
	flex-direction: row;

	.achievment {
		padding: 1rem 1.5rem;
		min-width: 55%;
		max-width: 55%;
		background-color: ${(props) => (props.$state == "complete" ? props.theme.highlight : props.theme.primary)};
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.reward {
		padding: 1rem;
		flex-grow: 1;
		background-color: ${(props) => (props.$state == "used" ? props.theme.primary : props.theme.highlight)};
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		.name {
			font-weight: bold;
		}
	}

	.name {
		font-weight: bold;
	}

	.description {
		font-size: 0.9rem;
	}
`;

export const QrCode = styled.img`
	width: 10rem;
	aspect-ratio: 1;
	margin-top: 1rem;
	border: 10px solid ${(props) => props.theme.white};
`;

export const LogoutButton = styled.button`
	background-color: ${(props) => props.theme.primary};
	padding: 1rem;
	color: ${(props) => props.theme.primaryText};
	border: none;
	border-radius: 1rem;
	transition: all ease 0.25s;
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.theme.highlight};
	}
`;

