import React from "react";

import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
} from "@syncfusion/ej2-react-charts";

const SparkLine = ({ id, height, width, color, data, type, currentColor }) => {
  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      dataSource={data}
      xName="xval"
      yName="yval"
      type={type}
      fill={color}
      lineWidth={1}
      valueType='Numeric'
      tooltipSettings={{
        visible: true, format: '${xval} : data ${yval}', trackLineSettings: {
          visible: true
        }
      }}

    >
      <Inject services={[SparklineTooltip]} />

    </SparklineComponent>
  );
};

export default SparkLine;
