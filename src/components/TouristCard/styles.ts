import styled from "styled-components";

export const CardContainer = styled.div`
	min-width: 17rem;
	max-width: 17rem;
	aspect-ratio: 1.25;
	border-radius: 1rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;

	.image-wrapper {
		width: 100%;
		overflow: hidden;
		border: 4px solid ${(props) => props.theme.primary};
		border-radius: inherit;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		transition: border ease-in-out 0.25s;

		&:hover {
			border-width: 2px;
		}

		img {
			max-width: 100%;
		}
	}

	.description-wrapper {
		width: 100%;
		flex-grow: 1;
		padding: 1rem;
		background-color: ${(props) => props.theme.primary};
		color: ${(props) => props.theme.primaryText};

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		* {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.title {
			font-size: 1rem;
		}

		.city {
			font-size: 0.9rem;
		}

		.details {
			font-size: 0.9rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.icon {
				font-size: 1rem;
				transform: translateY(0.1rem);
			}

			div {
				display: flex;
				flex-direction: row;
				gap: 0.25rem;
			}
		}
	}
`;

