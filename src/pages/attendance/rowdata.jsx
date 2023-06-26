const RowData = ({ firstName, lastName, checkIn, checkOut, department }) => {
  const getDateTime = (dateTime) => {
    if (dateTime === null) {
      return {
        date: "",
        time: "",
      };
    }
    const _dateTime = new Date(dateTime * 1000);
    const _time = _dateTime.toLocaleTimeString();
    const _date = _dateTime.toLocaleDateString();
    return {
      date: _date,
      time: _time,
    };
  };
  return (
    <tr className="hover:bg-gray-100 transition cursor-pointer">
      <td className="py-4 px-4 border-b text-gray-800">
        {getDateTime(checkIn).date}
      </td>
      <td className="py-4 px-4 border-b font-poppins text-gray-700 rounded-tl-lg rounded-bl-lg">
        {firstName}
      </td>
      <td className="py-4 px-4 border-b font-poppins text-gray-700">
        {`${lastName}`}
      </td>
      <td className="py-4 px-4 border-b text-gray-800">{department}</td>
      <td className="py-4 px-4 border-b text-gray-800">
        {getDateTime(checkIn).time}
      </td>
      <td className="py-4 px-4 border-b text-gray-800">
        {getDateTime(checkOut).time}
      </td>
    </tr>
  );
};

export default RowData;
