import React from 'react';
import ReactPaginate from 'react-paginate';

interface Column {
  name: string;
  row?: (item: any) => React.ReactNode | string;
}

interface TablePaginateProps {
  data: any[];
  columns: Column[];
  totalPage: number;
  onPageChange?: (params: {
    current_page(current_page: any): void; selected: number
  }) => void;
  paginate?: boolean
}

const TablePaginate: React.FC<TablePaginateProps> = ({ data, columns, totalPage, onPageChange, paginate = true }) => {

    return (
      <div className="card">
        <div className="p-6">
          <div className="overflow-auto w-full">
            <div className="w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-4 py-4 text-start text-sm font-medium text-gray-500"
                        >
                          {column.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data?.map((item, rowIndex) => (
                      <tr key={rowIndex} >
                        {columns.map((column, colIndex) => (
                          <td
                            key={colIndex}
                            className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200"
                          >
                            {typeof column.row === 'function' ? column.row(item) : item[column.name]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={`${paginate ? 'flex' :'hidden' }  list-pagination  items-center md:mt-10 mt-7`}>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={onPageChange}
                    pageRangeDisplayed={2}
                    pageCount={totalPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  

};

export default TablePaginate;