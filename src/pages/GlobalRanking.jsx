import React from "react"
import LayoutDashboard from "../pages/LayoutDashboard"
import FooterDashboard from "../components/navigation/footer_dashboard"
import { FixedSizeList as List } from 'react-window'
import { useQuery } from "react-query"

import { getUsersRanking } from "../api/user"
import { ReactComponent as Trophy } from '../assets/icons/trophy.svg'
import Loader from "../components/loader"

const Row = ({ user, style, index }) => (
    <div className="row" style={{ backgroundColor: style }}>
        <div className="row--number">
            {index + 1}
        </div>
        <div>
            {user.username}
        </div>
        <div>
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
                                const bg = index % 2 ? "#CDB4FF" : "#BFFFD6"
                                return <Row user={user} style={bg} index={index} />
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