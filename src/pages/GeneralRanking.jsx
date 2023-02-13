import React, { useCallback, useEffect, useState } from "react"
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import { useTable, useSortBy } from "react-table";

import { ReactComponent as Trophy } from '../assets/icons/trophy.svg'

const data = [
    { number: 1, avatar: "avatar1.jpg", name: "John Doe", score: 90, trophy: "gold" },
    { number: 2, avatar: "avatar2.jpg", name: "Jane Doe", score: 80, trophy: "silver" },
    { number: 3, avatar: "avatar3.jpg", name: "Jim Smith", score: 70, trophy: "bronze" },
    { number: 4, avatar: "avatar4.jpg", name: "Lane Gosh", score: 65, trophy: "" },
    { number: 5, avatar: "avatar5.jpg", name: "Lane Gosh", score: 60, trophy: "" },
    { number: 6, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
    { number: 7, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
    { number: 8, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
    { number: 9, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
    { number: 10, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
    { number: 11, avatar: "avatar5.jpg", name: "Lane Gosh", score: 50, trophy: "" },
];

const columns = [
    {
      Header: "Nr",
      accessor: "number",
      sortable: true
    },
    {
      Header: "Avatar",
      accessor: "avatar",
      Cell: ({ value }) => <img src={value} alt="avatar" />
    },
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Score",
      accessor: "score"
    },
    {
      Header: "Trophy",
      accessor: "trophy"
    }
];
const GeneralRanking = () => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable({ columns, data }, useSortBy);
    

    return (
        <LayoutDashboard className="general-ranking-page">
            <div className="general-ranking-page--content">
                <div className="general-ranking-page--content__title">
                    <h1 className="">Classement général</h1>
                    <Trophy></Trophy>
                </div>

                <div className="general-ranking-page--content__table">
                

                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                <span>
                                {column.isSorted
                                    ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                    : ""}
                                </span>
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                            </tr>
                        );
                        })}
                    </tbody>
                    </table>
                </div>
            </div>

            <FooterDashboard></FooterDashboard>         
        </LayoutDashboard>
    ) 

}

export default GeneralRanking