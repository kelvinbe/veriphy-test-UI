import React from 'react'
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { pieChartData } from '../../data/dummy';

const Pie = () => {

  const datalabel = { visible: true, name: 'text', position: 'Outside' };

  return (
    <AccumulationChartComponent id='charts' legendSettings={{ visible: false }}  enableSmartLabels={true} enableAnimation={false} center={{ x: '60%', y: '60%' }} tooltip={{ enable: false, format: '${point.x} : <b>${point.y}%</b>' }}>
      <Inject services={[AccumulationDataLabel]}/>
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective dataSource={pieChartData} xName='x' yName='y' pointColorMapping='fill' dataLabel={datalabel}></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

export default Pie



;
