const SkeletonLoaderTable = ({ numberOfRows }) => {
  const animationBoxes = [];
  for (let x = 0; x < numberOfRows; x++) {
    animationBoxes.push(
      <div className="bg-white flex justify-between py-4" key={x}>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
        <div className="bg-gray-200 w-20 rounded-lg h-4"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col [&>*]:border-b [&>*:last-child]:border-none min-w-96">
      {animationBoxes}
    </div>
  );
};
export default SkeletonLoaderTable;
