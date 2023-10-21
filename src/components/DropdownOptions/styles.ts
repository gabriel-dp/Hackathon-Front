import styled from "styled-components";

export const DropdownContainer = styled.div`
	height: 100%;
	width: 100%;

	position: relative;
	display: flex;
	flex-wrap: wrap;
`;

export const DropdownHeader = styled.div<{ loading: string }>`
	width: 100%;
	height: 100%;
	border-radius: 100rem;
	background-color: ${(props) => props.theme.white};
	border: 1px solid ${(props) => props.theme.gray}AA;
	color: ${(props) => props.theme.text};
	cursor: pointer;

	${(props) =>
		props.loading == "true" &&
		`
		background-color: ${props.theme.lightgray}; 
		* {
			cursor: wait;
		}
	`};

	display: flex;
	align-items: center;

	p {
		margin-left: 1rem;
		font-size: 0.85rem;
	}

	.icon {
		font-size: 1.25rem;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-40%);
	}

	.search-container {
		border: none;
		background-color: transparent;
	}
`;

interface ContentI {
	direction: string;
}

export const DropdownContent = styled.div<ContentI>`
	max-height: 575%;
	overflow-y: scroll;
	width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 0 1rem ${(props) => props.theme.gray}77;

	position: absolute;
	${(props) => (props.direction == "bottom" ? "top: 110%" : "bottom: 110%")};

	padding: 0.25rem;
	background-color: ${(props) => props.theme.white};
`;

export const DropdownItem = styled.div`
	width: 100%;
	border-radius: 0.25rem;
	padding: 0.625rem;
	font-size: 0.85rem;
	transition: all ease 0.25s;
	cursor: pointer;

	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&.clear {
		color: ${(props) => props.theme.text}77;
	}

	&:hover {
		background-color: ${(props) => props.theme.lightgray};
	}
`;

