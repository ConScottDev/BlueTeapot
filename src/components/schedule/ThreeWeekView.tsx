// import React, { useMemo } from 'react';
// import TimeGrid from 'react-big-calendar/lib/TimeGrid';
// import { DateLocalizer, Navigate, ViewProps } from 'react-big-calendar';

// interface ThreeWeekViewProps extends ViewProps {
//   date: Date;
//   localizer: DateLocalizer;
//   max?: Date;
//   min?: Date;
//   scrollToTime?: Date;
// }

// const ThreeWeekView: React.FC<ThreeWeekViewProps> = ({
//   date,
//   localizer,
//   max = localizer.endOf(new Date(), 'day'),
//   min = localizer.startOf(new Date(), 'day'),
//   scrollToTime = localizer.startOf(new Date(), 'day'),
//   ...props
// }) => {
//   const currRange = useMemo(
//     () => ThreeWeekView.range(date, { localizer }),
//     [date, localizer]
//   );

//   return (
//     <TimeGrid
//       date={date}
//       localizer={localizer}
//       max={max}
//       min={min}
//       range={currRange}
//       scrollToTime={scrollToTime}
//       {...props}
//     />
//   );
// };

// ThreeWeekView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
//   const start = localizer.startOf(date, 'week');
//   const end = localizer.add(start, 21, 'day'); // Adjust to 3 weeks

//   let current = start;
//   const range = [];

//   while (localizer.lte(current, end, 'day')) {
//     range.push(current);
//     current = localizer.add(current, 1, 'day');
//   }

//   return range;
// };

// ThreeWeekView.navigate = (date: Date, action: 'PREV' | 'NEXT' | 'DATE', { localizer }: { localizer: DateLocalizer }) => {
//   switch (action) {
//     case Navigate.PREVIOUS:
//       return localizer.add(date, -21, 'day');

//     case Navigate.NEXT:
//       return localizer.add(date, 21, 'day');

//     default:
//       return date;
//   }
// };

// ThreeWeekView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
//   const [start, ...rest] = ThreeWeekView.range(date, { localizer });
//   return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
// };

// export default ThreeWeekView;
export {};
