import { LineChart } from '@mui/x-charts';
import dtpermohonan from '../data/DataLineChart.json';

const PermohonanChart = () => {
  // Extract data from JSON file
  const years = dtpermohonan.data.map(item => item.year);
  const totalApplications = dtpermohonan.data.map(item => item.total_applications);
  const applicationsInProgress = dtpermohonan.data.map(item => item.applications_in_progress);

  return (
    <div>
      <LineChart
        height="180"

        series={[
          {
            label: 'Total Applications',
            data: totalApplications,
            color: 'blue',
          },
          {
            label: 'Applications in Progress',
            data: applicationsInProgress,
            color: 'green',
          }
        ]}
        xAxis={[
          {
            label: 'Year',
            data: years,
          }
        ]}
        yAxis={[
          {
            label: 'Applications',
          }
        ]}
      />
    </div>
  );
};

export default PermohonanChart;
