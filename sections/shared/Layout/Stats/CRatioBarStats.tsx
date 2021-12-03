import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import useStakingCalculations from 'sections/staking/hooks/useStakingCalculations';

import { formatPercent } from 'utils/formatters/number';

import { BarStatBox, BarHeaderSection, BarTitle, BarValue, StyledProgressBar } from './common';

const CRatioBarStats: FC = () => {
	const { t } = useTranslation();

	const {
		percentageCurrentCRatio,
		percentageTargetCRatio,
		percentCurrentCRatioOfTarget,
	} = useStakingCalculations();

	return (
		<StyledBarStatBox>
			<BarHeaderSection>
				<BarTitle>{t('sidenav.bars.c-ratio')}</BarTitle>
				<BarValue>{formatPercent(percentageCurrentCRatio)}</BarValue>
			</BarHeaderSection>
			<StyledProgressBar percentage={percentCurrentCRatioOfTarget.toNumber()} variant="blue-pink" />
			<BarHeaderSection>
				<BarTitle>{t('sidenav.bars.t-ratio')}</BarTitle>
				<StyledBarValue>{formatPercent(percentageTargetCRatio)}</StyledBarValue>
			</BarHeaderSection>
		</StyledBarStatBox>
	);
};

const StyledBarStatBox = styled(BarStatBox)`
	margin-bottom: 0.9rem;
`;
const StyledBarValue = styled(BarValue)`
	font-family: Microsoft YaHei;
	color: ${(props) => props.theme.colors.white};
	font-weight:500;
`;

export default CRatioBarStats;
