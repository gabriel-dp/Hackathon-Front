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
	isComplete: string;
}

export const AchievmentCard = styled.div<AchievmentCardI>`
	width: 100%;
	padding: 1.25rem;
	text-decoration: ${(props) => (props.isComplete == "true" ? "line-through" : "none")};
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.primaryText};
	border-radius: 1rem;
	opacity: ${(props) => (props.isComplete == "true" ? "0.5" : "1")};
`;

