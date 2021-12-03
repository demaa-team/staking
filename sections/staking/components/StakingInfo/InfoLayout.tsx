import { FC, useMemo } from 'react';
import styled from 'styled-components';
import Wei from '@synthetixio/wei';
import { Trans, useTranslation } from 'react-i18next';
import { Svg } from 'react-optimized-image';

import ArrowRightIcon from 'assets/svg/app/arrow-right.svg';
import { formatCurrency } from 'utils/formatters/number';
import { EXTERNAL_LINKS } from 'constants/links';
import { FlexDivCentered } from 'styles/common';
import { CryptoCurrency } from 'constants/currency';

import BarStatsRow from './BarStatsRow';

import {
	Title,
	Subtitle,
	StyledLink,
	DataContainer,
	DataRow,
	RowTitle,
	RowValue,
	ValueContainer,
	InfoContainer,
	InfoHeader,
} from '../common';
import { StakingPanelType } from 'store/staking';

type BarChartData = {
	title: string;
	value: Wei;
	changedValue: Wei;
	percentage: Wei;
	changedPercentage: Wei;
	currencyKey: CryptoCurrency;
};

type RowData = {
	title: string;
	value: Wei;
	changedValue: Wei;
	currencyKey?: CryptoCurrency | string;
};

type StakingInfo = {
	barRows: BarChartData[];
	dataRows: RowData[];
};

type InfoLayoutProps = {
	stakingInfo: StakingInfo;
	collateral: Wei;
	isInputEmpty: boolean;
	infoType: StakingPanelType;
};

const InfoLayout: FC<InfoLayoutProps> = ({ stakingInfo, collateral, isInputEmpty, infoType }) => {
	const { t } = useTranslation();

	const title = useMemo(() => {
		switch (infoType) {
			case StakingPanelType.MINT:
				return t('staking.info.mint.title');
			case StakingPanelType.BURN:
				return t('staking.info.burn.title');
			case StakingPanelType.CLEAR:
				return t('staking.info.clear.title');
		}
	}, [infoType, t]);

	const subtitle = useMemo(() => {
		switch (infoType) {
			case StakingPanelType.MINT:
				return 'staking.info.mint.subtitle';
			case StakingPanelType.BURN:
				return 'staking.info.burn.subtitle';
			case StakingPanelType.CLEAR:
				return 'staking.info.clear.subtitle';
		}
	}, [infoType]);

	return (
		<InfoContainer>
			{/* <InfoHeader>
				<Title>{title}</Title>
				<Subtitle>
					<Trans
						i18nKey={subtitle}
						components={[<StyledLink href={EXTERNAL_LINKS.Synthetix.Litepaper} />]}
					/>
				</Subtitle>
			</InfoHeader> */}
			<TotalBalanceContainer>
				<TotalBalanceHeading>{t('staking.info.table.total-snx')}</TotalBalanceHeading>
				<RowValue>
					{formatCurrency(CryptoCurrency.DEM, collateral, {
						currencyKey: CryptoCurrency.DEM,
					})}
				</RowValue>
			</TotalBalanceContainer>
			<DataContainer>
				{stakingInfo.barRows.map(
					({ title, value, changedValue, percentage, changedPercentage, currencyKey }, i) => (
						<BarStatsRow
							key={`bar-stats-row-${i}`}
							title={title}
							type={i==0?'blue-pink':'green'}
							value={formatCurrency(currencyKey, isInputEmpty ? value : changedValue, {
								currencyKey: currencyKey,
							})}
							percentage={isInputEmpty ? percentage.toNumber() : changedPercentage.toNumber()}
						/>
					)
				)}
				{stakingInfo.dataRows.map(({ title, value, changedValue, currencyKey = '' }, i) => (
					<DataRow key={i}>
						<RowTitle>{title}</RowTitle>
						<ValueContainer>
							<RowValue>
								{formatCurrency(currencyKey, value.toString(), {
									currencyKey: currencyKey,
								})}
							</RowValue>
							{!isInputEmpty && changedValue && (
								<>
									<StyledArrowRight src={ArrowRightIcon} />
									<RowValue>
										{formatCurrency(currencyKey, changedValue, {
											currencyKey: currencyKey,
										})}
									</RowValue>
								</>
							)}
						</ValueContainer>
					</DataRow>
				))}
			</DataContainer>
		</InfoContainer>
	);
};

const TotalBalanceHeading = styled(RowTitle)`
	border-bottom: none;
	color: ${(props) => props.theme.colors.white};
`;

const StyledArrowRight = styled(Svg)`
	margin: 0 5px;
	color: ${(props) => props.theme.colors.blue};
`;

const TotalBalanceContainer = styled(FlexDivCentered)`
	margin: 0.25rem 1.2rem;
	justify-content: space-between;
	// border-bottom: 1px solid #4C5496;
`;

export default InfoLayout;
