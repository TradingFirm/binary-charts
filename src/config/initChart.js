// $FlowFixMe
import { merge } from '../highcharts/highstock';
import reset from '../parts/reset';
import exporting from '../parts/exporting';
import plotOptions from '../parts/plotOptions';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
import { lightTheme, darkTheme } from '../themes';

// $FlowFixMe
export default ({ pipSize = 0,
                type = 'area',
                onRangeChange = () => ({}),
                onTypeChange,
                defaultRange = 5,
                showAllRangeSelector = true,
                noData = false,
                height,
                width,
                theme = 'light',
                shiftMode = 'fixed' }) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme, lastYExtremes: {}, shiftMode },
        ...reset(height, width, noData, { pipSize, theme, lastYExtremes: {}, shiftMode }),
        plotOptions: plotOptions(),
        rangeSelector: rangeSelector(defaultRange, showAllRangeSelector),
        xAxis: xAxis(onRangeChange),
        yAxis: {
            ...yAxis(pipSize),
            indicators: {
                enabled: true,
                pipSize,
            },
        },
        series: seriesLine([], pipSize, type),
        tooltip: {
            style: {
                color: '#333333',
            },
        },
        exporting: exporting(onTypeChange),
    });
