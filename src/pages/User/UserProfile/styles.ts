import styled from "styled-components";

export const UserContainer = styled.div`
	width: 100%;
	height: 100dvh;
	overflow-y: scroll;

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
	padding: 1.25rem;
	text-decoration: ${(props) => (props.$state == "used" ? "line-through" : "none")};
	background-color: ${(props) => (props.$state == "complete" ? props.theme.highlight : props.theme.primary)};
	color: ${(props) => props.theme.primaryText};
	border-radius: 1rem;
	opacity: ${(props) => (props.$state == "used" ? "0.5" : "1")};

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

