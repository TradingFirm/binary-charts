import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';
import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import updateZones from './updateZones';
import updateExtremes from './updateExtremes';

const replacePlotBands = (axis, newPlotBands) => {
    axis.removePlotBand('barrier-band');
    newPlotBands.forEach(band => axis.addPlotBand(band));
};

const replacePlotLines = (axis, newPlotLines) => {
    axis.removePlotLine('time-line');
    newPlotLines.forEach(line => {
        axis.addPlotLine(line);
    });
};

export default ({ chart, contract, ticks }) => {
    const lastTick = getLastTickQuote(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands);

    const newPlotLines = dateEntryPlotLines(contract);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    updateZones(chart, newPlotLines);

    updateExtremes(chart, ticks, contract);
};