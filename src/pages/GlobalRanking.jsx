import React, { useContext } from "react"
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import { FixedSizeList as List } from 'react-window'
import { useQuery } from "react-query"

import { getUsersRanking } from "../api/user"
import { ReactComponent as Trophy } from '../assets/icons/trophy.svg'
import Loader from "../components/loader"
import { ThemeContext } from "../context/ThemeContext"

const GeneralRanking = () => {
    const { theme } = useContext(ThemeContext)

    const { data, isLoading } = useQuery("usersRanking", getUsersRanking)

    const Row = ({ index, style }) => (
        <div className="row" style={{ backgroundColor: style.bg }}>
            <div className="row--number" style={{ color: style.color }}>
                {index + 1}
            </div>
            <div style={{ color: style.color }}>
                {data[index]?.username}
            </div>
            <div style={{ color: style.color }}>
                {data[index]?.global_score}
            </div>
            <div className="row--trophy">
                {index === 0 && <Trophy fill="#e8b923" />}
                {index === 1 && <Trophy fill="#c0c0c0" />}
                {index === 2 && <Trophy fill="#cd7f32" />}
            </div>
        </div>
    )

    return (
        <LayoutDashboard>
            <div className="general-ranking-page--content__title">
                <h1 className="">Classement général</h1>
            </div>

            <div className="general-ranking-page--content">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="global-ranking--header">
                            <div className="global-ranking--header__number">N°</div>
                            <div className="global-ranking--header__name">Nom</div>
                            <div className="global-ranking--header__score">Score</div>
                            <div className="global-ranking--header__trophy">Trophée</div>
                        </div>
                        <List
                            height={600}
                            itemCount={data.length}
                            itemSize={60}
                            width={"100%"}
                        >
                            {({ index }) => {
                                const bg = index % 2 ? "#3E3E3E" : "#000000"
                                const bgLight = index % 2 ? "#f6f6f6" : "#ebebeb"
                                const color = index % 2 ? "#CDB4FF" : "#BFFFD6"
                                return <Row index={index} style={{ bg: theme === "light" ? bgLight : bg, color: theme === "light" ? "#3E3E3E" : color}} />
                            }}
                        </List>
                    </>
                )}
            </div>
            <FooterDashboard />
        </LayoutDashboard>
    )
}

export default GeneralRanking