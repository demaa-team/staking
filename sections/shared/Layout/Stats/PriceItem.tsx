import styled from 'styled-components';
import { FC } from 'react';
import { Trans } from 'react-i18next';

import { FlexDivCentered, FlexDivCol, FlexDivRowCentered, NoTextTransform } from 'styles/common';

import { CurrencyKey } from 'constants/currency';
import { NO_VALUE } from 'constants/placeholder';
import CurrencyPrice from 'components/Currency/CurrencyPrice';

import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

import LineChart, { LineChartData } from './LineChart';
import useSynthetixQueries from 'demaa-queries';
import { formatPercent } from 'utils/formatters/number';

type PriceItemProps = {
	currencyKey: CurrencyKey;
	data: LineChartData;
};

const PriceItem: FC<PriceItemProps> = ({ currencyKey, data }) => {
	const { selectedPriceCurrency, selectPriceCurrencyRate } = useSelectedPriceCurrency();
	const { useExchangeRatesQuery } = useSynthetixQueries();
	const exchangeRatesQuery = useExchangeRatesQuery();

	const exchangeRates = exchangeRatesQuery.data ?? null;
	const price = exchangeRates && exchangeRates[currencyKey];
	const trendLinePositive = data.length > 0 ? data[data.length - 1].value >= data[0].value : false;

	return (
		<Container>
			<Title>
				<span>
					<Trans
						i18nKey="common.currency.currency-price"
						values={{ currencyKey }}
						components={[<NoTextTransform />]}
					/>
				</span>
				{data.length > 0 ? (
					<FlexDivCentered>
						{trendLinePositive ? <TriangleUp /> : <TriangleDown />}
						<PercentChange trendLinePositive={trendLinePositive}>
							{formatPercent(data[data.length - 1].value / data[0].value - 1)}
						</PercentChange>
					</FlexDivCentered>
				) : (
					<div>{NO_VALUE}</div>
				)}
			</Title>
			<PriceInfo>
				{price != null ? (
					<StyledCurrencyPrice
						currencyKey={currencyKey}
						price={price}
						sign={selectedPriceCurrency.sign}
						conversionRate={selectPriceCurrencyRate}
					/>
				) : (
					<div>{NO_VALUE}</div>
				)}
			</PriceInfo>
			<LineChart data={data} trendLinePositive={trendLinePositive} currencyKey={currencyKey} />
		</Container>
	);
};

const Container = styled(FlexDivCol)`
	width: 100%;
	font-size: 0.6rem;
	margin-bottom: 0.9rem;
	&:last-child {
		padding-bottom: 0;
	}
`;

const Title = styled(FlexDivRowCentered)`
	font-family: Microsoft YaHei;
	color: ${(props) => props.theme.colors.white};
	text-transform: uppercase;
	padding-bottom: 5px;
`;

const StyledCurrencyPrice = styled(CurrencyPrice)`
	justify-items: start;
	.price {
		font-family: ${(props) => props.theme.fonts.mono};
	}
`;

const PriceInfo = styled(FlexDivCentered)`
	font-family: ${(props) => props.theme.fonts.mono};
	justify-content: space-between;
`;

const PercentChange = styled.div<{ trendLinePositive: boolean }>`
	font-size: 0.5rem;
	font-family: Microsoft YaHei;
	color: ${(props) =>
		props.trendLinePositive ? props.theme.colors.green : '#F86C29'};
`;

const TriangleMixin = `
	border-right: 4px solid transparent;
	border-left: 4px solid transparent;
	display: inline-block;
`;

const TriangleUp = styled.div`
	${TriangleMixin};
	border-bottom: ${(props) => `calc(2 * 4px * 0.866) solid #F86C29`};
	border-top: 4px solid transparent;
	margin-bottom: 4px;
	margin-right: 4px;
`;

const TriangleDown = styled.div`
	${TriangleMixin};
	border-top: ${(props) => `calc(2 * 4px * 0.866) solid #F86C29`};
	border-bottom: 4px solid transparent;
	margin-bottom: -5px;
	margin-right: 4px;
`;
export default PriceItem;
