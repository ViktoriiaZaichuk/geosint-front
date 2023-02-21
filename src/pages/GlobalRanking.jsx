import React, { useContext } from "react"
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import { FixedSizeList as List } from 'react-window'
import { useQuery } from "react-query"

import { getUsersRanking } from "../api/user"
import { ReactComponent as Trophy } from '../assets/icons/trophy.svg'
import Loader from "../components/loader"
import { ThemeContext } from "../context/ThemeContext"

const Row = ({ user, bg, index, color }) => (
    <div className="row" style={{ backgroundColor: bg }}>
        <div className="row--number" style={{ color: color }}>
            {index + 1}
        </div>
        <div style={{ color: color }}>
            {user.username}
        </div>
        <div style={{ color: color }}>
            {user.global_score}
        </div>
        <div className="row--trophy">
            {index === 0 && <Trophy fill="#e8b923" />}
            {index === 1 && <Trophy fill="#c0c0c0" />}
            {index === 2 && <Trophy fill="#cd7f32" />}
        </div>
    </div>
)

const GeneralRanking = () => {
    const { theme } = useContext(ThemeContext)

    const { data, isLoading } = useQuery("usersRanking", getUsersRanking)

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
                            itemCount={data?.length}
                            itemSize={60}
                            width={"100%"}
                        >
                            {({ index }) => {
                                const user = data[index]
                                const bg = index % 2 ? "#3E3E3E" : "#000000"
                                const bgLight = index % 2 ? "#f6f6f6" : "#ebebeb"
                                const color = index % 2 ? "#CDB4FF" : "#BFFFD6"
                                return <Row user={user} bg={theme === "light" ? bgLight : bg} index={index} color={theme === "light" ? "#3E3E3E" : color} />
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