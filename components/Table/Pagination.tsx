import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { GridDivCenteredCol, resetButtonCSS } from 'styles/common';
import { Svg } from 'react-optimized-image';

import LeftArrowIcon from 'assets/svg/app/caret-left.svg';
import LeftEndArrowIcon from 'assets/svg/app/caret-left-end.svg';
import RightArrowIcon from 'assets/svg/app/caret-right.svg';
import RightEndArrowIcon from 'assets/svg/app/caret-right-end.svg';

type PaginationProps = {
	pageIndex: number;
	pageCount: number;
	canNextPage: boolean;
	canPreviousPage: boolean;
	setPage: (page: number) => void;
	previousPage: () => void;
	nextPage: () => void;
};

const Pagination: FC<PaginationProps> = ({
	pageIndex,
	pageCount,
	canNextPage = true,
	canPreviousPage = true,
	setPage,
	nextPage,
	previousPage,
}) => {
	const { t } = useTranslation();

	return (
		<PaginationContainer className="table-pagination">
			<span>
				<ArrowButton onClick={() => setPage(0)} disabled={!canPreviousPage}>
					<Svg src={LeftEndArrowIcon} />
				</ArrowButton>
				<ArrowButton onClick={() => previousPage()} disabled={!canPreviousPage}>
					<Svg src={LeftArrowIcon} />
				</ArrowButton>
			</span>
			<PageInfo>
				{pageIndex + 1}
				{/* {t('common.pagination.page')}{' '} */}
				{/* {t('common.pagination.page-of-total-pages', { page: pageIndex + 1, totalPages: pageCount })} */}
			</PageInfo>
			<span>
				<ArrowButton onClick={() => nextPage()} disabled={!canNextPage}>
					<Svg src={RightArrowIcon} />
				</ArrowButton>
				<ArrowButton onClick={() => setPage(pageCount - 1)} disabled={!canNextPage}>
					<Svg src={RightEndArrowIcon} />
				</ArrowButton>
			</span>
		</PaginationContainer>
	);
};

const PageInfo = styled.span`
	color: ${(props) => props.theme.colors.white};
	display:inline-block;
	border-radius:50%;
	border:1px solid #F76C2A;
	width:20px;
	height:20px;
	line-height:20px;
	text-align:center;
`;

const PaginationContainer = styled.div`
	// grid-template-columns: auto 1fr auto;
	// background-color: ${(props) => props.theme.colors.navy};
	text-align:end;
	padding: 13px 12px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	justify-items: center;
	font-size: 14px;
`;

const ArrowButton = styled.button`
	${resetButtonCSS};
	padding: 4px;
	svg {
		width: 14px;
		height: 14px;
		color: ${(props) => props.theme.colors.white};
	}
	&[disabled] {
		cursor: default;
		svg {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

export default Pagination;
