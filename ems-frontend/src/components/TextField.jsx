/* eslint-disable react/prop-types */
export const TextFeild = ({ field, employee, setEmployee, error }) => {
  return (
    <div className={field}>
      <label
        htmlFor={field}
        className="block text-sm font-medium text-gray-600 mb-2"
      >
        {field}
      </label>
      <input
        type="text"
        id={field}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder={`Enter the ${field}`}
        value={employee[field]}
        onChange={(e) => {
          setEmployee({ ...employee, [field]: e.target.value });
        }}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
