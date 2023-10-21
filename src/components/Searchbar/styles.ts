import styled from "styled-components";

export const SearchContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.white};
	border: 1px solid ${(props) => props.theme.gray};
	border-radius: 100rem;
	overflow: hidden;

	display: flex;
	flex-direction: row;
`;

export const SearchInput = styled.input`
	height: 100%;
	flex-grow: 1;
	padding: 0 1rem;
	background-color: transparent;
	border: none;

	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
