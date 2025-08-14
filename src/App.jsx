import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

// Payload contains the weekly KPI data along with goals. In a production
// environment you could fetch this from a service or import from a JSON
// file. For this example it's embedded directly for ease of use.
const PAYLOAD = {
  weeklySeries: {
    AHT: [
      { week: '2025-03-31', num: 132689.0, den: 12849.0, value: 10.327795841196902 },
      { week: '2025-04-07', num: 131116.0, den: 12640.0, value: 10.374681012658228 },
      { week: '2025-04-14', num: 131337.0, den: 12892.0, value: 10.187450504728542 },
      { week: '2025-04-21', num: 129516.0, den: 12868.0, value: 10.066960532084719 },
      { week: '2025-04-28', num: 129470.0, den: 12725.0, value: 10.178039513677812 },
      { week: '2025-05-05', num: 125796.0, den: 12422.0, value: 10.128220105633803 },
      { week: '2025-05-12', num: 123992.0, den: 12188.0, value: 10.17717611580246 },
      { week: '2025-05-19', num: 117624.0, den: 11712.0, value: 10.042207792207792 },
      { week: '2025-05-26', num: 113511.0, den: 11134.0, value: 10.194247959945637 },
      { week: '2025-06-02', num: 104491.0, den: 10317.0, value: 10.129981999417138 },
      { week: '2025-06-09', num: 93021.0, den: 9179.0, value: 10.136374056562709 },
      { week: '2025-06-16', num: 90473.0, den: 8897.0, value: 10.169833142980991 },
      { week: '2025-06-23', num: 86071.0, den: 8472.0, value: 10.16011315417256 },
      { week: '2025-06-30', num: 81969.0, den: 8029.0, value: 10.209199526431075 },
      { week: '2025-07-07', num: 77346.0, den: 7649.0, value: 10.113102228432093 },
      { week: '2025-07-14', num: 70666.0, den: 6953.0, value: 10.163213639987057 },
      { week: '2025-07-21', num: 61329.0, den: 5973.0, value: 10.268445839874232 },
      { week: '2025-07-28', num: 48149.0, den: 4736.0, value: 10.169678378378379 },
      { week: '2025-08-04', num: 18314.0, den: 1914.0, value: 9.57142646114379 },
    ],
    CHT: [
      { week: '2025-03-31', num: 112443.0, den: 12849.0, value: 8.748551734231703 },
      { week: '2025-04-07', num: 111735.0, den: 12640.0, value: 8.84283164556962 },
      { week: '2025-04-14', num: 112979.0, den: 12892.0, value: 8.763681477766758 },
      { week: '2025-04-21', num: 111203.0, den: 12868.0, value: 8.642400248677608 },
      { week: '2025-04-28', num: 109698.0, den: 12725.0, value: 8.61833855799373 },
      { week: '2025-05-05', num: 104792.0, den: 12422.0, value: 8.434890502336304 },
      { week: '2025-05-12', num: 102811.0, den: 12188.0, value: 8.436049778076753 },
      { week: '2025-05-19', num: 97211.0, den: 11712.0, value: 8.300782268578878 },
      { week: '2025-05-26', num: 93653.0, den: 11134.0, value: 8.411606491749328 },
      { week: '2025-06-02', num: 86038.0, den: 10317.0, value: 8.341624209278589 },
      { week: '2025-06-09', num: 76039.0, den: 9179.0, value: 8.285828172946961 },
      { week: '2025-06-16', num: 74201.0, den: 8897.0, value: 8.341871764471713 },
      { week: '2025-06-23', num: 70113.0, den: 8472.0, value: 8.277666666666666 },
      { week: '2025-06-30', num: 66532.0, den: 8029.0, value: 8.285981346379112 },
      { week: '2025-07-07', num: 62728.0, den: 7649.0, value: 8.201082229123347 },
      { week: '2025-07-14', num: 57165.0, den: 6953.0, value: 8.221972253325691 },
      { week: '2025-07-21', num: 49755.0, den: 5973.0, value: 8.327535971073537 },
      { week: '2025-07-28', num: 39285.0, den: 4736.0, value: 8.294133474576271 },
      { week: '2025-08-04', num: 14910.0, den: 1914.0, value: 7.789863379614016 },
    ],
    Concurrency: [
      { week: '2025-03-31', num: 132689.0, den: 112443.0, value: 1.1801679166901425 },
      { week: '2025-04-07', num: 131116.0, den: 111735.0, value: 1.1734256658468245 },
      { week: '2025-04-14', num: 131337.0, den: 112979.0, value: 1.1627425576589185 },
      { week: '2025-04-21', num: 129516.0, den: 111203.0, value: 1.1648211186281985 },
      { week: '2025-04-28', num: 129470.0, den: 109698.0, value: 1.1801025936300531 },
      { week: '2025-05-05', num: 125796.0, den: 104792.0, value: 1.2004823827060384 },
      { week: '2025-05-12', num: 123992.0, den: 102811.0, value: 1.2059564554598946 },
      { week: '2025-05-19', num: 117624.0, den: 97211.0, value: 1.2106155944568202 },
      { week: '2025-05-26', num: 113511.0, den: 93653.0, value: 1.2124353006238206 },
      { week: '2025-06-02', num: 104491.0, den: 86038.0, value: 1.2148068722421187 },
      { week: '2025-06-09', num: 93021.0, den: 76039.0, value: 1.2233999127550287 },
      { week: '2025-06-16', num: 90473.0, den: 74201.0, value: 1.2195386606151387 },
      { week: '2025-06-23', num: 86071.0, den: 70113.0, value: 1.2276197370427813 },
      { week: '2025-06-30', num: 81969.0, den: 66532.0, value: 1.231896960325491 },
      { week: '2025-07-07', num: 77346.0, den: 62728.0, value: 1.2329117377572987 },
      { week: '2025-07-14', num: 70666.0, den: 57165.0, value: 1.23612967498209 },
      { week: '2025-07-21', num: 61329.0, den: 49755.0, value: 1.2327276422170881 },
      { week: '2025-07-28', num: 48149.0, den: 39285.0, value: 1.225695226744186 },
      { week: '2025-08-04', num: 18314.0, den: 14910.0, value: 1.22886527322191 },
    ],
    CPH: [
      { week: '2025-03-31', num: 12849.0, den: 1874.05, value: 6.855761072015987 },
      { week: '2025-04-07', num: 12640.0, den: 1862.25, value: 6.786632390745501 },
      { week: '2025-04-14', num: 12892.0, den: 1882.9833333333333, value: 6.8459914955370495 },
      { week: '2025-04-21', num: 12868.0, den: 1853.3833333333334, value: 6.943782985326349 },
      { week: '2025-04-28', num: 12725.0, den: 1828.3, value: 6.961106873759777 },
      { week: '2025-05-05', num: 12422.0, den: 1746.5333333333333, value: 7.111653580385727 },
      { week: '2025-05-12', num: 12188.0, den: 1713.5166666666667, value: 7.111017908012701 },
      { week: '2025-05-19', num: 11712.0, den: 1620.1833333333334, value: 7.227351790145286 },
      { week: '2025-05-26', num: 11134.0, den: 1560.8833333333334, value: 7.134062611400041 },
      { week: '2025-06-02', num: 10317.0, den: 1433.9666666666667, value: 7.194097670345867 },
      { week: '2025-06-09', num: 9179.0, den: 1267.3166666666666, value: 7.244222336882312 },
      { week: '2025-06-16', num: 8897.0, den: 1236.6833333333334, value: 7.194031467555341 },
      { week: '2025-06-23', num: 8472.0, den: 1168.55, value: 7.252678624813212 },
      { week: '2025-06-30', num: 8029.0, den: 1108.8666666666666, value: 7.2437018084662715 },
      { week: '2025-07-07', num: 7649.0, den: 1045.4666666666667, value: 7.319491423192129 },
      { week: '2025-07-14', num: 6953.0, den: 952.75, value: 7.294385320662309 },
      { week: '2025-07-21', num: 5973.0, den: 829.25, value: 7.201651737049283 },
      { week: '2025-07-28', num: 4736.0, den: 654.75, value: 7.234956820412644 },
      { week: '2025-08-04', num: 1914.0, den: 248.5, value: 7.701207243460765 },
    ],
  },
  dailyDetail: {
    AHT: {},
    CHT: {},
    Concurrency: {},
    CPH: {},
  },
  agentStats90: {
    AHT: {},
    CHT: {},
    Concurrency: {},
    CPH: {},
  },
  goals: {
    AHT: 9.5,
    CPH: 5.56,
  },
};

// Definitions for each KPI including the human name, unit and whether it
// has a goal line. These definitions drive the UI and tooltips.
const KPI_DEFS = {
  AHT: { name: 'AHT', unit: 'mins/ticket', hasGoal: true, goal: PAYLOAD.goals.AHT },
  CHT: { name: 'CHT', unit: 'mins/ticket', hasGoal: false },
  Concurrency: { name: 'Concurrency', unit: 'ratio', hasGoal: false },
  CPH: { name: 'CPH', unit: 'cases/hour', hasGoal: true, goal: PAYLOAD.goals.CPH },
};

// Calculate a simple moving average for the provided points. The moving
// average smooths out short–term fluctuations and is controlled by the
// window size `n`. It returns an array of objects with the same date
// formatting as the chart expects.
function movingAverage(points, n = 3) {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    const start = Math.max(0, i - n + 1);
    const slice = points.slice(start, i + 1);
    const avg = slice.reduce((s, p) => s + p.value, 0) / slice.length;
    out.push({ date: slice[slice.length - 1].date, value: avg });
  }
  return out;
}

// Return the index of the maximum value in an array of points. If the array
// is empty it returns -1. This helps preselect a sensible starting point
// for the secondary panel.
function indexOfMax(points) {
  if (!points?.length) return -1;
  let idx = 0;
  let max = -Infinity;
  for (let i = 0; i < points.length; i++) {
    if (Number.isFinite(points[i].value) && points[i].value > max) {
      max = points[i].value;
      idx = i;
    }
  }
  return idx;
}

/**
 * MainChart renders the weekly trend for the selected KPI. It draws the
 * primary line, optional goal and trend lines and supports clicking
 * individual points to focus the secondary panel. It also rotates
 * tick labels to avoid overlap and clamps the y‐axis domain to just
 * beyond the observed min/max values to better show variation.
 */
function MainChart({ kpiKey, onPointClick, selectedIndex, showTrend }) {
  const kpi = KPI_DEFS[kpiKey];
  // Convert the raw weekly data into a structure with ISO dates and values.
  const data = useMemo(
    () =>
      (PAYLOAD.weeklySeries[kpiKey] || []).map((d) => ({
        date: d.week, // ISO string without time
        value: +d.value,
      })),
    [kpiKey]
  );
  // Compute the min and max for the y‐axis and pad them slightly.
  const [yMin, yMax] = useMemo(() => {
    if (!data.length) return [0, 0];
    let min = Infinity;
    let max = -Infinity;
    data.forEach((d) => {
      if (d.value < min) min = d.value;
      if (d.value > max) max = d.value;
    });
    // Add a small margin so the lines don't sit on the edges of the chart.
    const range = max - min;
    const padding = range === 0 ? 1 : range * 0.05;
    return [Math.max(0, min - padding), max + padding];
  }, [data]);
  // Compute the trend line (moving average) if requested.
  const trend = useMemo(() => (showTrend ? movingAverage(data, 3) : []), [data, showTrend]);
  // Determine the selected ISO date for the reference area.
  const selectedDate = data[selectedIndex]?.date;
  // Handle click events on the chart. Recharts provides the activeLabel
  // property on the event payload which corresponds to the x‐axis label.
  const handleClick = (chartState) => {
    const iso = chartState?.activeLabel;
    if (!iso) return;
    const idx = data.findIndex((d) => d.date === iso);
    if (idx !== -1) onPointClick(idx);
  };
  return (
    <div
      className="relative h-full w-full rounded-2xl border"
      style={{ borderColor: '#D4D2CA', backgroundColor: '#FFFFFF' }}
    >
      <div className="h-[420px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 16, right: 24, bottom: 40, left: 0 }}
            onClick={handleClick}
          >
            <CartesianGrid stroke="rgba(0,0,0,0.10)" />
            <XAxis
              dataKey="date"
              interval={0}
              angle={-45}
              textAnchor="end"
              tickFormatter={(v) => {
                const date = new Date(v);
                return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
              }}
              tick={{ fill: '#004984', fontSize: 12 }}
              tickMargin={16}
              height={60}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fill: '#004984', fontSize: 12 }}
              tickMargin={8}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA', borderRadius: 10 }}
              labelStyle={{ color: '#004984' }}
              formatter={(value) => [Number(value).toFixed(2), kpi.unit]}
            />
            {/* Goal line, if applicable */}
            {kpi.hasGoal && (
              <ReferenceLine
                y={kpi.goal}
                stroke="#004984"
                strokeDasharray="4 4"
                label={{ value: `Goal ${kpi.goal}`, position: 'right', fill: '#004984', fontSize: 12 }}
              />
            )}
            {/* Highlight the selected column with a subtle background */}
            {selectedDate && (
              <ReferenceArea
                x1={selectedDate}
                x2={selectedDate}
                stroke="none"
                fill="rgba(4,133,252,0.08)"
              />
            )}
            {/* Primary KPI line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: '#FFFFFF', fill: 'url(#lineGradient)', cursor: 'pointer' }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF', fill: 'url(#lineGradient)' }}
            />
            {/* Trend line (moving average) */}
            {showTrend && trend.length > 0 && (
              <Line
                data={trend}
                type="monotone"
                dataKey="value"
                stroke="#4498F2"
                strokeDasharray="6 6"
                strokeWidth={2}
                dot={false}
              />
            )}
            {/* Gradient definition for the main line */}
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#0F9ED5" />
                <stop offset="100%" stopColor="#A02B93" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute left-4 top-2 text-sm font-bold" style={{ color: '#3047B0' }}>
        {kpi.name} ({kpi.unit})
      </div>
    </div>
  );
}

/**
 * SecondaryPanel displays additional detail for the selected week. When
 * daily or agent level data is available it will show another line
 * chart; otherwise it will present a placeholder message. A toggle
 * allows the user to switch to a box plot mode which is not
 * implemented in this preview.
 */
function SecondaryPanel({ kpiKey, weekISO }) {
  const [mode, setMode] = useState('detail');
  const kpi = KPI_DEFS[kpiKey];
  // Extract daily detail for the selected week. Keys in the payload are
  // ISO strings beginning with the date; find the one that matches.
  const dailyArr = useMemo(() => {
    const map = PAYLOAD.dailyDetail[kpiKey] || {};
    const prefix = (weekISO || '').slice(0, 10);
    const key = Object.keys(map).find((k) => k.startsWith(prefix));
    const arr = key ? map[key] || [] : [];
    return arr.slice().sort((a, b) => a.date.localeCompare(b.date));
  }, [kpiKey, weekISO]);
  const hasDaily = dailyArr.length > 0;
  return (
    <div className="h-full w-full p-2">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-bold" style={{ color: '#3047B0' }}>
          {mode === 'detail' ? 'Drilldown' : 'Box plot'} — {kpi.name}
        </h4>
        <div className="flex gap-2">
          <button
            className={`px-2 py-1 rounded-lg text-xs ${mode === 'detail' ? 'bg-blue-med text-white' : 'bg-grey-box text-blue-text'}`}
            onClick={() => setMode('detail')}
          >
            Desglose
          </button>
          <button
            className={`px-2 py-1 rounded-lg text-xs ${mode === 'box' ? 'bg-blue-med text-white' : 'bg-grey-box text-blue-text'}`}
            onClick={() => setMode('box')}
          >
            Box plot
          </button>
        </div>
      </div>
      {mode === 'detail' ? (
        <div
          className="h-[140px] rounded-xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA' }}
        >
          {hasDaily ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyArr.map((d) => ({ date: d.date, value: d.value }))}
                margin={{ top: 8, right: 8, bottom: 24, left: 0 }}
              >
                <CartesianGrid stroke="rgba(0,0,0,0.10)" />
                <XAxis
                  dataKey="date"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={(v) => {
                    const date = new Date(v);
                    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                  }}
                  tick={{ fill: '#004984', fontSize: 10 }}
                  tickMargin={12}
                  height={50}
                />
                <YAxis
                  tick={{ fill: '#004984', fontSize: 10 }}
                  tickMargin={6}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA', borderRadius: 10 }}
                  labelStyle={{ color: '#004984', fontSize: 10 }}
                  formatter={(value) => [Number(value).toFixed(2), kpi.unit]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0F9ED5"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full grid place-items-center text-sm" style={{ color: '#004984' }}>
              Sin datos diarios para esta semana.
            </div>
          )}
        </div>
      ) : (
        <div
          className="h-[140px] rounded-xl grid place-items-center text-sm"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA', color: '#004984' }}
        >
          Box plot (90% vol.) — disponible en el ZIP completo o si cargas detalle diario/por agente.
        </div>
      )}
      {/* Agent-level statistics placeholder */}
      <div
        className="mt-2 rounded-xl p-2 text-xs"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA', color: '#004984' }}
      >
        <div className="font-bold mb-1">Agent-level (90% volume)</div>
        <div className="text-[12px]">
          Para este preview, la tarjeta se completa cuando haya datos por agente. En el ZIP final quedará calculada (nAgents90, mean, VSF, max/min, #cumplen/#no).
        </div>
      </div>
    </div>
  );
}

/**
 * The main App component composes the various parts of the dashboard. It
 * manages global state such as the selected KPI, whether the trend line
 * is shown and which point is currently selected. It also assembles the
 * page layout using Tailwind CSS utility classes to match the provided
 * guidelines and corporate palette.
 */
export default function App() {
  const KPIS = ['AHT', 'Concurrency', 'CHT', 'CPH'];
  const [kpiKey, setKpiKey] = useState('AHT');
  const data = useMemo(() => {
    return (PAYLOAD.weeklySeries[kpiKey] || []).map((d) => ({
      date: d.week,
      value: d.value,
    }));
  }, [kpiKey]);
  const [showTrend, setShowTrend] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(() => indexOfMax(data));
  // When the KPI changes, reselect the maximum to highlight an interesting week.
  React.useEffect(() => {
    setSelectedIdx(indexOfMax(data));
  }, [data]);
  const selectedWeekISO = useMemo(() => data[selectedIdx]?.date || null, [data, selectedIdx]);
  // Compose textual insights for the right-hand commentary panel. Each
  // commentary line is limited to roughly 80 words to remain concise.
  const comments = useMemo(() => {
    const def = KPI_DEFS[kpiKey];
    const maxVal = data[selectedIdx]?.value?.toFixed?.(2);
    const date = selectedWeekISO;
    return [
      `${def.name}: peak at ${maxVal ?? '-'} on ${date ?? '—'}. Focus on the daily distribution and agent spread (90% volume) for that period.`,
      `Trend is ${showTrend ? 'enabled' : 'off'}. Goals ${def.hasGoal ? 'shown' : 'not applicable'}. Use the buttons above to toggle KPI and trend.`,
    ];
  }, [kpiKey, data, selectedIdx, showTrend, selectedWeekISO]);
  // Slide number could be provided by the user. A default of 1 is used
  // when none is specified. In a future integration this could be
  // parameterised via props or URL parameters.
  const slideNumber = 1;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-violet via-orange to-cyan"></div>
      <div className="flex-1 p-6">
        <header className="mb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-dark">
              Analysis of KPIs | Rebel | Trend Overview
            </h1>
            <div className="text-sm text-blue-text">
              Slide Nº {slideNumber} · Base: weekly (StartOfWeek)
            </div>
          </div>
          <div className="flex items-center gap-2">
            {KPIS.map((key) => (
              <button
                key={key}
                onClick={() => setKpiKey(key)}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  kpiKey === key
                    ? 'bg-blue-med text-white border-blue-med'
                    : 'bg-grey-box text-blue-text border-grey-box'
                }`}
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => setShowTrend((v) => !v)}
              className={`px-3 py-2 rounded-xl border text-sm ${
                showTrend
                  ? 'bg-blue-intermediate text-white border-blue-intermediate'
                  : 'bg-grey-box text-blue-text border-grey-box'
              }`}
            >
              Trend {showTrend ? 'ON' : 'OFF'}
            </button>
          </div>
        </header>
        <div className="grid grid-cols-4 gap-4">
          {/* Left 50%: primary chart */}
          <div className="col-span-2">
            <MainChart
              kpiKey={kpiKey}
              showTrend={showTrend}
              selectedIndex={selectedIdx}
              onPointClick={(idx) => setSelectedIdx(idx)}
            />
          </div>
          {/* Right 50%: top detail and bottom commentary */}
          <div className="col-span-2 grid grid-rows-2 gap-4">
            {/* Secondary panel (top right) */}
            <div
              className="h-full w-full rounded-2xl"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA' }}
            >
              {selectedWeekISO ? (
                <SecondaryPanel kpiKey={kpiKey} weekISO={selectedWeekISO} />
              ) : (
                <div className="h-full w-full grid place-items-center text-sm" style={{ color: '#004984' }}>
                  Selecciona un punto para ver el desglose.
                </div>
              )}
            </div>
            {/* Insights panel (bottom right) */}
            <div
              className="h-full w-full rounded-2xl p-4"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #D4D2CA' }}
            >
              <h3 className="text-lg font-bold text-blue-dark">Insights</h3>
              <div className="mt-3 space-y-3 text-[14px]" style={{ color: '#004984' }}>
                {comments.map((c, i) => (
                  <p key={i} className="leading-tight">
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-6 text-xs text-blue-text">
          • Dotted goal on AHT=9.5 and CPH=5.56. • Click a point to focus and trigger drilldown.
          • Colors follow corporate palette.
        </footer>
      </div>
      {/* Bottom gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-violet via-orange to-cyan"></div>
    </div>
  );
}