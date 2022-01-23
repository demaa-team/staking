import { FC } from 'react';
import { Svg } from 'react-optimized-image';

import { formatPercent } from 'utils/formatters/number';
import styled from 'styled-components';

import ChangePositiveIcon from 'assets/svg/app/change-positive.svg';
import ChangeNegativeIcon from 'assets/svg/app/change-negative.svg';

type ChangePercentProps = {
	value: number;
	className?: string;
};

export const ChangePercent: FC<ChangePercentProps> = ({ value, ...rest }) => {
	const isPositive = value >= 0;

	return (
		<CurrencyChange isPositive={isPositive} {...rest}>
			{isPositive ? (
				<Svg
					src={ChangePositiveIcon}
					viewBox={`0 0 ${ChangePositiveIcon.width} ${ChangePositiveIcon.height}`}
				/>
			) : (
				<Svg
					src={ChangeNegativeIcon}
					viewBox={`0 0 ${ChangeNegativeIcon.width} ${ChangeNegativeIcon.height}`}
				/>
			)}
			{formatPercent(Math.abs(value))}
		</CurrencyChange>
	);
};

const CurrencyChange = styled.span<{ isPositive: boolean }>`
	display: inline-flex;
	align-items: center;
	color: ${(props) => (props.isPositive ? props.theme.colors.white : props.theme.colors.white)};
	svg {
		margin-right: 2px;
		width: 8px;
		height: 8px;
	}
`;

export default ChangePercent;
