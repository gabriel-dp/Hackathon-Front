import styled from "styled-components";

export const HomeContainer = styled.div`
	width: 100%;
	height: 100dvh;
	display: flex;
	flex-direction: column;
`;

export const MapContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: lightblue;
`;

interface OpenCloseMenuI {
	$isOpen: string;
}

export const MenuContainer = styled.div<OpenCloseMenuI>`
	width: 100%;
	padding: 1rem;
	padding-top: 1.5rem;
	padding-bottom: 0;
	background-color: ${(props) => props.theme.white};
	border-top-right-radius: 2rem;
	border-top-left-radius: 2rem;
	filter: drop-shadow(0 0 1rem #00000055);
	transition: top ease-in-out 0.5s;

	position: absolute;
	top: ${(props) => (props.$isOpen == "true" ? "20%" : "calc(100% - 5rem)")};
	bottom: 0;
	left: 0;

	.content {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		.search-wrapper {
			min-height: 2.5rem;
			width: min(100%, 35rem);

			.search {
				border: none;
			}
		}

		.content-wrapper {
			overflow-y: scroll;
			width: min(100%, 50rem);

			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}
	}
`;

export const OpenCloseMenu = styled.button<OpenCloseMenuI>`
	width: 5rem;
	padding: 0.5rem 0;
	background-color: inherit;
	border: none;
	border-top-right-radius: 1rem;
	border-top-left-radius: 1rem;
	cursor: pointer;

	position: absolute;
	bottom: calc(100% - 0.5rem);
	left: 50%;
	transform: translateX(-50%);

	.icon {
		font-size: 1.5rem;
		color: ${(props) => props.theme.gray};
		transition: all ease-in-out 0.5s;
		transform: ${(props) => (props.$isOpen == "true" ? "rotate(180deg)" : "rotate(0deg)")};
	}
`;

export const CategoryCards = styled.div`
	max-width: min(100%, 50rem);
	display: flex;
	flex-direction: column;
	align-items: center;

	.title {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.carrousel {
		padding: 1rem 0;
		width: 100%;
		overflow-x: scroll;
		display: flex;
		gap: 1rem;
	}

	.empty {
		margin-top: 0.5rem;
		font-size: 0.9rem;
	}
`;

