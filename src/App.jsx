import { useMemo, useEffect, useState } from "react";
import { fetchPosts } from "./lib/dataFetcher";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

function App() {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const columns = useMemo(
		() => [
			{
				accessorFn: (row) => row.id,
				id: "post.id",
				header: "ID",
				cell: (info) => info.getValue(),
			},
			{
				accessorFn: (row) => row.title,
				id: "post.title",
				header: "Title",
				cell: (info) => info.getValue(),
			},
		],
		[]
	);

	useEffect(() => {
		fetchPosts(currentPage).then((response) => {
			setData(response.data);
		});
	}, [currentPage]);

	const table = useReactTable({
		data,
		columns,
    getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	return (
		<>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
			<div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 3}
        >
          Next
        </button>
      </div>
		</>
	);
}

export default App;
